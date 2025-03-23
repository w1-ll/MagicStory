import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

export default function HomePage() {
    const [step, setStep] = useState<'genres' | 'stories' | 'gender' | null>('genres');
    const [selectedGenre, setSelectedGenre] = useState<keyof typeof stories | null>(null);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);

    const stories = {
        Morals: [
            { title: 'The Honest Woodcutter', image: 'https://example.com/morals1.jpg' },
            { title: 'The Boy Who Cried Wolf', image: 'https://example.com/morals2.jpg' },
        ],
        Adventure: [
            { title: 'The Lost Treasure', image: 'https://example.com/adventure1.jpg' },
            { title: 'Jungle Quest', image: 'https://example.com/adventure2.jpg' },
        ],
        Action: [
            { title: 'Heroic Rescue', image: 'https://example.com/action1.jpg' },
            { title: 'Battle of the Brave', image: 'https://example.com/action2.jpg' },
        ],
        Princess: [
            { title: 'The Enchanted Castle', image: 'https://example.com/princess1.jpg' },
            { title: 'The Royal Ball', image: 'https://example.com/princess2.jpg' },
        ],
    };

    const handleGenreSelect = (genre: keyof typeof stories) => {
        setSelectedGenre(genre);
        setStep('stories');
    };

    const handleStorySelect = (story: string) => {
        setSelectedStory(story);
        setStep('gender');
    };

    const handleBack = () => {
        if (step === 'stories') {
            setStep('genres');
            setSelectedGenre(null);
        } else if (step === 'gender') {
            setStep('stories');
            setSelectedStory(null);
        }
    };

    return (
        <View style={styles.container}>
            {step === 'genres' && (
                <>
                    <Text style={styles.title}>Select a Genre</Text>
                    <Picker
                        selectedValue={selectedGenre}
                        onValueChange={(itemValue) => itemValue && handleGenreSelect(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a Genre" value="" />
                        {Object.keys(stories).map((genre) => (
                            <Picker.Item key={genre} label={genre} value={genre} />
                        ))}
                    </Picker>
                </>
            )}

            {step === 'stories' && selectedGenre && (
                <>
                    <Text style={styles.title}>Select a Story in {selectedGenre}</Text>
                    <View style={styles.storyContainer}>
                        {stories[selectedGenre].map((story) => (
                            <TouchableOpacity
                                key={story.title}
                                style={styles.storyCard}
                                onPress={() => handleStorySelect(story.title)}
                            >
                                <Image source={{ uri: story.image }} style={styles.storyImage} />
                                <Text style={styles.storyTitle}>{story.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.verticallySpaced}>
                        <Button buttonStyle={styles.backButtonStyle} title="Back" onPress={handleBack} />
                    </View>
                </>
            )}

            {step === 'gender' && selectedStory && (
                <>
                    <Text style={styles.title}>Select Gender for "{selectedStory}"</Text>
                    {['Boy', 'Girl'].map((gender) => (
                        <View key={gender} style={styles.verticallySpaced}>
                            <Button
                                buttonStyle={styles.buttonStyle}
                                title={gender}
                                onPress={() => console.log(`${gender} selected for ${selectedStory}`)}
                            />
                        </View>
                    ))}
                    <View style={styles.verticallySpaced}>
                        <Button buttonStyle={styles.backButtonStyle} title="Back" onPress={handleBack} />
                    </View>
                </>
            )}

            <View style={styles.verticallySpaced}>
                <Button
                    buttonStyle={styles.signOutButtonStyle}
                    title="Sign Out"
                    onPress={() => supabase.auth.signOut()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#dbe9ee',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    verticallySpaced: {
        paddingVertical: 4,
        alignSelf: 'stretch',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
    },
    storyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    storyCard: {
        width: 150,
        margin: 10,
        alignItems: 'center',
    },
    storyImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    storyTitle: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: '#218380',
        borderRadius: 25,
    },
    backButtonStyle: {
        backgroundColor: '#f39c12',
        borderRadius: 25,
    },
    signOutButtonStyle: {
        backgroundColor: '#e74c3c',
        borderRadius: 25,
        marginTop: 20,
    },
});
