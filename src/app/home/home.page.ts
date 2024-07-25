import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
  trendingRecipes = [
    {
      title: 'Tonkotsu Ramen',
      description: 'A flavorful broth with tender noodles, topped with slices of pork, egg, and green onions.',
      tag: 'Trending'
    },
    {
      title: 'Margherita Pizza',
      description: 'Classic pizza with a crispy crust, tomato sauce, mozzarella cheese, and fresh basil.',
      tag: 'Trending'
    },
    {
      title: 'Chicken Curry',
      description: 'Spicy and savory chicken curry served with a side of steamed jasmine rice.',
      tag: 'Trending'
    },
    {
      title: 'Quinoa Salad',
      description: 'Healthy quinoa salad mixed with fresh vegetables and a tangy dressing.',
      tag: 'Trending'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.setInitialTheme();
  }

  async setInitialTheme() {
    const { value } = await Preferences.get({ key: 'theme' });
    console.log('Initial theme:', value);
    document.body.setAttribute('color-theme', value || 'light');
  }

  async toggleTheme() {
    const currentTheme = document.body.getAttribute('color-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('color-theme', newTheme);
    console.log('Theme toggled:', newTheme);
    await Preferences.set({
      key: 'theme',
      value: newTheme
    });
  }
  isDarkTheme(): boolean {
    return document.body.getAttribute('color-theme') === 'dark';
  }
  toggleCategory(category: string) {
    console.log(`Category ${category} toggled`);
    // Lógica para manejar la activación/desactivación de categorías
  }
}
