import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { firebaseConfig } from "../../config/firebase.js"

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


import styles from "./style.js";

//================================================================
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//================================================================



export default function Tarefa({ navigation }) {

    //Lista de tarefas
    const [task, setTask] = useState([]);

    //Função para excluir tarefas
    function excluirTask(id) {
        deleteDoc(doc(db, "Tarefa", id));
    }

    const fetchTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tarefa"));
            const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTask(tasksData);

        } catch (error) {
            console.error("Erro ao carregar Firebase:", error);
        }
    };

    fetchTasks();



    useEffect(() => {


        fetchTasks();


    }, []);




    return (

        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.Tasks}>

                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={() => {
                                    excluirTask(item.id)
                                }}
                            >
                                <FontAwesome name="trash" size={23} color="#1967d2">
                                </FontAwesome>
                            </TouchableOpacity>

                            <Text
                                style={styles.DescriptionTask}
                                onPress={() => {
                                    navigation.navigate("Detalhes", { id: item.id, descricao: item.descricao, })
                                }}

                            >
                                {item.descricao}
                            </Text>


                        </View>
                    )
                }}
            />
            <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NovaTarefa")}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>


        </View>
    )

}