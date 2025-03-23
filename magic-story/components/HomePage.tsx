import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

export default function HomePage({ navigation }: { navigation: any }) {
    const [step, setStep] = useState<'genres' | 'stories' | 'gender' | 'start' | null>('genres');
    const [selectedGenre, setSelectedGenre] = useState<keyof typeof stories | null>(null);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedAge, setSelectedAge] = useState<number | null>(null);

    useEffect(() => {
        async function updateAge() {
            const user = await supabase.auth.getUser();
            const thisUser = user.data.user ?? null;
            const { data, error: profileError } = await supabase
                .from('profiles')
                .update([
                    { age: selectedAge }
                ])
                .eq('id', thisUser?.id);

            if (profileError) {
                console.error('Error adding profile:', profileError);
            } else {
                console.log('User created and profile added successfully:', data);
            }
        }
        updateAge();
    }, [selectedAge]);

    const stories = {
        Morals: [
            { title: 'The Honest Woodcutter', image: require('../assets/Honest_Wood_Cutter.jpg') },
            { title: 'The Boy Who Cried Wolf', image: require('../assets/wolf.jpg') },
        ],
        Adventure: [
            { title: 'The Lost Treasure', image: require('../assets/lost_treasure.jpg') },
            { title: 'Jungle Book', image: require('../assets/jungle_book.jpg') },
        ],
        Action: [
            { title: 'Heroic Rescue', image: require('../assets/rescue_heroes.jpg') },
            { title: 'Spy Kids', image: require('../assets/Spy_Kids.jpg') },
        ],
        Princess: [
            { title: 'Frozen', image: require('../assets/Frozen.jpg') },
            { title: 'Princess and the Pea', image: require('../assets/Princess.jpg') },
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

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
        setStep('start');
    };

    const handleBack = () => {
        if (step === 'stories') {
            setStep('genres');
            setSelectedGenre(null);
        } else if (step === 'gender') {
            setStep('stories');
            setSelectedStory(null);
        } else if (step === 'start') {
            setStep('gender');
            setSelectedGender(null);
        }
    };

    const handleStartStory = () => {
        console.log(`Starting story "${selectedStory}" for a ${selectedGender}`);
        // Add logic to start the story
    };

    return (
        <ImageBackground source={require('@/assets/background.jpeg')}
            style={styles.container}
        >

            {step === 'genres' && (
                <>
                    <Text style={styles.title}>Select Your Age (3-8yrs)</Text>
                    <Picker
                        selectedValue={selectedAge}
                        onValueChange={(itemValue) => setSelectedAge(itemValue)}
                        style={styles.picker}
                        placeholder='Select Age'
                    >
                        {[3, 4, 5, 6, 7, 8].map((age) => (
                            <Picker.Item key={age} label={`${age} years old`} value={age} />
                        ))}
                    </Picker>
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
                                <Image
                                    source={
                                        typeof story.image === 'string'
                                            ? { uri: story.image }
                                            : story.image
                                    }
                                    style={styles.storyImage}
                                />
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
                                onPress={() => handleGenderSelect(gender)}
                            />
                        </View>
                    ))}
                    <View style={styles.verticallySpaced}>
                        <Button buttonStyle={styles.backButtonStyle} title="Back" onPress={handleBack} />
                    </View>
                </>
            )}

            {step === 'start' && selectedStory && selectedGender && (
                <>
                    <Text style={styles.title}>
                        Ready to start "{selectedStory}" for a {selectedGender}?
                    </Text>
                    <View style={styles.verticallySpaced}>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Start"
                            onPress={navigation.navigate('Story')}
                        />
                    </View>
                    <View style={[styles.verticallySpaced]}>
                        <Button buttonStyle={styles.backButtonStyle} title="Back" onPress={handleBack} />
                    </View>
                </>
            )}

            <View style={[styles.verticallySpaced, styles.signOutButton]}>
                <Button
                    buttonStyle={styles.signOutButtonStyle}
                    title="Sign Out"
                    onPress={() => supabase.auth.signOut()}
                />
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        alignItems: 'center',
        // backgroundColor: '#dbe9ee',
        paddingTop: 110,
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
    age: {
        color: '#36454F',
        paddingLeft: 12,
    },
    signOutButton: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});
