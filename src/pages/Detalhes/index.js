import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import styles from "./style"

//================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

import { firebaseConfig } from "../../config/firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//================================================================


export default function Detalhes({ navigation, route }) {
    
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.descricao)
    const idTask = route.params.id

    function editTask(description, id) {

        const tarefaRef = doc(db, "Tarefa", id);

        updateDoc(tarefaRef, {
            descricao: description,
            status: true
        });

        navigation.navigate("Tarefa")
    }


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Estudar javascript"
                onChangeText={setDescriptionEdit}
                value={descriptionEdit}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => {
                    editTask(descriptionEdit, idTask)
                }}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}