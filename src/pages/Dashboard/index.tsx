import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        const result = await api.get('foods');
        setFoods(result.data);
      } catch (e) {
        console.log(e);
      }
    }

    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const result = await api.post('foods', { ...food, available: true });
      setFoods([...foods, result.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    console.log(editingFood);
    const result = await api.put<IFoodPlate>(`foods/${editingFood.id}`, {
      ...editingFood,
      ...food,
    });

    console.log(result.data);
    const foodIndex = foods.findIndex(f => f.id === editingFood.id);
    const updatedFoods = [...foods];
    updatedFoods[foodIndex] = result.data;
    setFoods(updatedFoods);
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`foods/${id}`);
    const filteredFoods = foods.filter(f => f.id !== id);
    setFoods(filteredFoods);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    toggleEditModal();
    setEditingFood(food);
  }

  async function handleAvailability(id: number, available: boolean): Promise<void> {
    const result = await api.patch<IFoodPlate>(`foods/${id}`, {
      available
    });
    console.log(result);
  }


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleAvailability={handleAvailability}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
