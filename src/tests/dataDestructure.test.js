import { svRecipes } from '../utils/dataDestructure';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

const destructuredMeal = {
  id: '52977',
  type: 'Meal',
  name: 'Corba',
  area: 'Turkish',
  category: 'Side',
  alcoholicOrNot: undefined,
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  ingredients: [
    { name: 'Lentils', quantity: '1 cup ' },
    { name: 'Onion', quantity: '1 large' },
    { name: 'Carrots', quantity: '1 large' },
    { name: 'Tomato Puree', quantity: '1 tbs' },
    { name: 'Cumin', quantity: '2 tsp' },
    { name: 'Paprika', quantity: '1 tsp ' },
    { name: 'Mint', quantity: '1/2 tsp' },
    { name: 'Thyme', quantity: '1/2 tsp' },
    { name: 'Black Pepper', quantity: '1/4 tsp' },
    { name: 'Red Pepper Flakes', quantity: '1/4 tsp' },
    { name: 'Vegetable Stock', quantity: '4 cups ' },
    { name: 'Water', quantity: '1 cup ' },
    { name: 'Sea Salt', quantity: 'Pinch' },
  ],
  youtube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
  instructions:
    'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\n' +
    'In a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\n' +
    'Add the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\n' +
    'Immediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\n' +
    'After it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\n' +
    'After the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\n' +
    'Serve with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
  tags: ['Soup'],
};

const destructuredDrink = {
  id: '15997',
  type: 'Drink',
  name: 'GG',
  area: undefined,
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  ingredients: [
    { name: 'Galliano', quantity: '2 1/2 shots ' },
    { name: 'Ginger ale', quantity: null },
    { name: 'Ice', quantity: null },
  ],
  youtube: undefined,
  instructions:
    'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
  tags: null,
};

describe('dataDestructure.js tests', () => {
  test('svRecipes returns destructured objects', () => {
    expect(svRecipes(meals)[0]).toEqual(destructuredMeal);
    expect(svRecipes(meals).length).toBe(25);
    expect(svRecipes(drinks)[0]).toEqual(destructuredDrink);
  });
});
