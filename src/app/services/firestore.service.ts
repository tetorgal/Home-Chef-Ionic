import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  portions: number;
  cookingTime: number;
  process: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createRecipe(recipe: Recipe): Promise<DocumentReference<DocumentData>> {
    return this.firestore.collection<DocumentData>('recipes').add(recipe);
  }

  readRecipes(): Observable<Recipe[]> {
    return this.firestore
      .collection<Recipe>('recipes')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Recipe;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  updateRecipe(recipeId: string, updatedData: Partial<Recipe>): Promise<void> {
    return this.firestore
      .collection('recipes')
      .doc(recipeId)
      .update(updatedData);
  }

  deleteRecipe(recipeId: string): Promise<void> {
    return this.firestore.collection('recipes').doc(recipeId).delete();
  }
}
