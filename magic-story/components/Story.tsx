import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";

const storyPages = [
    {
        title: "The Boy Who Cried Wolf",
        text: "",
        background: require("@/assets/story_title_bg.png") // Background for title page
    },
    {
        text: "A young shepherd boy was watching over a flock of sheep near his village. He got a bit bored, so to liven things up he shouted “Wolf! Wolf!” just to have some fun",
        background: require("@/assets/boy_who_cried_wolf_1.jpg"),
    },
    {
        text: "The villagers ran to help him, but when they arrived they couldn't see a wolf. The boy laughed at them and they left in anger.",
        background: require("@/assets/boy_who_cried_wolf_2.jpg"),
    },
    {
        text: "A couple of days passed and the boy decided to have some fun again and so he thought he'd try again. He shouted 'Wolf! Help! Please!'",
        background: require("@/assets/boy_who_cried_wolf_3.jpg"),
    },
    {
        text: "This time fewer people from the village came to see if there was a wolf. And once again they found no wolf and left angry at the shepherd boy.",
        background: require("@/assets/image_4.jpg"),
    },
    {
        text: "The next day, as the boy was watching the sheep, a real wolf came. Now the boy started screaming and shouting, terrified of the wolf: “Help, help! Please, help me! There's a wolf and he's killing your sheep!'",
        background: require("@/assets/image_5.jpg"),
    },
    {
        text: "But no one came, because the villagers didn't believe him. This is how liars are rewarded - even if they tell the truth, no one believes them.",
        background: require("@/assets/image_6.jpg"),
    },
];

export default function Story({ navigation }: any) {
    const [pageIndex, setPageIndex] = useState(0);
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

    const handleNext = () => {
        if (pageIndex < storyPages.length - 1) {
            setPageIndex(pageIndex + 1);
        } else {
            navigation.goBack(); // Return to Home after last page
        }
    };
    const handleBack = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1); // Go back to the previous page
        } else {
            navigation.goBack(); // Go back to the previous screen if on the first page
        }
    };

    return (
        <ImageBackground source={storyPages[pageIndex].background} style={styles.background}>
            <View style={styles.container}>
                {pageIndex === 0 ? (
                    <Text style={styles.title}>{storyPages[pageIndex].title}</Text>
                ) : (
                    <Text style={styles.storyText}>{storyPages[pageIndex].text}</Text>
                )}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
    },
    storyText: {
        fontSize: 24,
        color: "#000000",
        textAlign: "center",
        marginBottom: 20,
        backgroundColor: "#dbe9ee",
        padding: 20,
        borderRadius: 20,
    },
    nextButton: {
        position: "absolute",
        bottom: 50,
        right: 20,
        backgroundColor: "#f39c12",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    nextText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    backButton: {
        position: "absolute",
        bottom: 50,
        left: 20,
        backgroundColor: "#f39c12",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    backText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
});
