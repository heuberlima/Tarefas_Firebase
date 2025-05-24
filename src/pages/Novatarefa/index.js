import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "./style";

//================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore"; 

import { firebaseConfig } from "../../config/firebase.js"


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//================================================================

export default function Novatarefa({ navigation }, props) {

    const [description, setDescription] = useState(null);
  
    function addTask(){

        addDoc(collection(db, "Tarefa"), {
            descricao: description,
            status: true
          });

      navigation.navigate("Tarefa");
    }
  
  return(
      <View style={styles.container}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
        style={styles.input}
        placeholder="Ex: estudar javascript"
        onChangeText={setDescription}
        value={description}
        />
        <TouchableOpacity 
          style={styles.buttonNewTask}
          onPress={()=>{
            addTask()
          }}
        >
          <Text style={styles.iconButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }