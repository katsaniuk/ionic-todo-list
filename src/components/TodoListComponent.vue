<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Todo List</ion-title>
        <ion-buttons v-if="!confirmMode" slot="end">
          <ion-button @click="selectAll">Select All</ion-button>
        </ion-buttons>
        <ion-buttons v-if="confirmMode" slot="end">
          <ion-button @click="deSelectAll">Deselect All</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <img src="../img/Logo.png" alt="Logo" class="logo" />
    </ion-header>
    <ion-content>
      <ion-list class="todos-list">
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder">
          <ion-item
            v-for="(todo, index) in todos"
            :key="index"
            class="todos-item"
            :class="{
              'completed-todo': todo.completed,
              'selected-todo': selectAllMode
            }"
          >
            <ion-checkbox
              :checked="todo.completed"
              @ionChange="toggle(todo.id)"
              class="custom-checkbox"
            ></ion-checkbox>
            <ion-reorder
              class="label-container"
              :class="{ 'completed-todo': todo.completed }"
            >
              <ion-label :class="{ completed: todo.completed }">{{
                todo.title
              }}</ion-label>
            </ion-reorder>
            <ion-button
              class="icon icon-remove"
              :class="{ 'red-icon': todo.completed }"
              fill="clear"
              slot="end"
              @click="remove(todo.id)"
            >
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-reorder-group>
      </ion-list>
    </ion-content>

    <ion-footer v-if="!selectAllMode && !confirmMode">
      <ion-toolbar>
        <ion-input
          class="custom-input"
          v-model="inputText"
          placeholder="Enter your new ToDo..."
        >
          <ion-button slot="end" @click="addTo" fill="clear">
            <ion-icon class="icon icon-add" :icon="addCircleSharp"></ion-icon>
          </ion-button>
        </ion-input>
      </ion-toolbar>
    </ion-footer>

    <ion-footer v-if="confirmMode" collapse="fade">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="confirmAll">Confirm All</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button slot="end" @click="deleteAll">Delete All</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonIcon,
  IonInput,
  IonButtons,
  IonBackButton,
  IonReorder,
  IonReorderGroup,
  IonFooter
} from '@ionic/vue';
import { addIcons } from 'ionicons';
import { addCircleSharp, trash, caretBack } from 'ionicons/icons';
import {
  getTodos,
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodoOrder
} from '@/services/TodoService';

addIcons({
  addCircleSharp,
  trash,
  caretBack
});

const todos = ref(getTodos());
onMounted(() => {
  todos.value = getTodos();
});

const inputText = ref('');
const addTo = () => {
  if (inputText.value) {
    addTodo(inputText.value);
    todos.value = getTodos();
    inputText.value = '';
  }
};

const selectAllMode = ref(false);
const confirmMode = ref(false);

const selectAll = () => {
  selectAllMode.value = true;
  confirmMode.value = true;
};
const deSelectAll = () => {
  selectAllMode.value = false;
  confirmMode.value = false;
};

const confirmAll = () => {
  todos.value.forEach((todo) => (todo.completed = true));
  updateTodoOrder(todos.value);
  cancelSelectMode();
};

const deleteAll = () => {
  const selectedTodos = todos.value.filter((todo) => todo.completed);
  selectedTodos.forEach((todo) => remove(todo.id));
  todos.value = getTodos();
  cancelSelectMode();
};

const cancelSelectMode = () => {
  selectAllMode.value = false;
  confirmMode.value = false;
};

const remove = (id: number) => {
  removeTodo(id);
  todos.value = getTodos();
};

const toggle = (id: number) => {
  toggleTodo(id);
  todos.value = getTodos();
};

const handleReorder = (event: CustomEvent) => {
  const movedTodo = todos.value.splice(event.detail.from, 1)[0];
  todos.value.splice(event.detail.to, 0, movedTodo);

  updateTodoOrder(todos.value);
  window.location.reload();
};
</script>

<style scoped>
.logo {
  margin-left: 40%;
  margin-top: 10%;
}
.todos-item {
  width: 90%;
  border-radius: 10px;
  position: relative;
  left: 5%;
  right: 5%;
  box-shadow: 0px 4px 16px 0px #0000001a;
  font-family: Trebuchet MS;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  margin-bottom: 10px;
}
.todos-list {
  margin-top: 135px;
}

.custom-input {
  position: fixed;
  bottom: 3%;
  width: 90%;
  height: 50px;
  left: 5%;
  right: 5%;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  padding-left: 15px;
  --padding-start: 15px;
}

.completed-todo {
  color: #a0a0a0;
}

.custom-checkbox {
  --checkbox-background-checked: rgba(0, 0, 0, 0.2);
  --border-color-checked: transparent;
}

.custom-checkbox::part(container) {
  border-radius: 3px;
  --border-color: #000000;
  --border-style: solid;
  --border-width: 2px;
}

.icon {
  color: rgba(0, 0, 0, 0.5);
}
.red-icon {
  color: rgba(0, 0, 0, 0.2);
}
.selected-todo {
  --background: rgba(0, 123, 255, 0.2);
}
.label-container {
  flex-grow: 1;
  overflow: hidden;
  margin-right: 10px;
}
</style>
