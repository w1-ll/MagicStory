import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

export default function StoryChatbot({ navigation }: { navigation: any }) {
    const [chat, setChat] = useState([{ role: "system", text: "Welcome! Start the story by typing below." }]);
    const [input, setInput] = useState("");
    const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
    } = require("@google/generative-ai");

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });
    const handleSend = async () => {
        if (!input.trim()) return;

        const newChat = [...chat, { role: "user", text: input }];
        setChat(newChat);
        setInput("");

        try {
            const chatSession = model.startChat({
                history: newChat.map(({ role, text }) => ({ role, parts: [{ text }] })),
            });

            const result = await chatSession.sendMessage(input);
            const response = result.response.text();

            setChat([...newChat, { role: "model", text: response }]);
        } catch (error) {
            console.error("Error generating response:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Story Chatbot</Text>
            <ScrollView style={styles.chatBox}>
                {chat.map((msg, index) => (
                    <Text key={index} style={msg.role === "user" ? styles.userText : styles.botText}>
                        {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Type your response..."
            />
            <Button title="Send" onPress={handleSend} />
            <View>
                <Button title="Back" onPress={() => navigation.navigate("Home")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    chatBox: { flex: 1, marginBottom: 10 },
    userText: { alignSelf: "flex-end", backgroundColor: "#DCF8C6", padding: 10, borderRadius: 8, marginVertical: 4 },
    botText: { alignSelf: "flex-start", backgroundColor: "#EEE", padding: 10, borderRadius: 8, marginVertical: 4 },
    input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: "#fff" },
});
