import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { styles } from './styles';
import { theme } from '../../theme';
import { api } from '../../libs/api';
import { feedbackTypes } from '../../utils/feedbackTypes'


import { FeedbackType } from '../../components/Widget';
import { ScreeshotButton } from '../ScreeshotButton';
import { Button } from '../Button';

interface Props{
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({
    feedbackType,
    onFeedbackCanceled,
    onFeedbackSent
}: Props) {

    const [screenshot , setScreeshot ] = useState<string | null>(null)
    const [ isSendingFeedback, setIsSendingFeedback ] = useState(false)
    const [ comment, setComment ] = useState('')

    const feedbackTypeInfo = feedbackTypes[feedbackType];


    function handleScreeshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreeshot(uri))
        .catch(err => console.log(err))

    }

    function handleScreeshotRemove(){
        setScreeshot(null)
    }

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return
        }

        setIsSendingFeedback(true)

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try{

            await api.post('/feedbacks' , {
                type: feedbackType,
                screenshot: `data:image/png;base64,${screenshotBase64}`,
                comment
            })

            onFeedbackSent()


        }catch(err){
            console.log(err)
            setIsSendingFeedback(false)
        }
    }

  return (
    <View style={styles.container}>
        <View
            style={styles.header}
        >
            <TouchableOpacity
                onPress={onFeedbackCanceled}
            >
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary} 
                />
            </TouchableOpacity>
            <View
                style={styles.titleContainer}
            >
                <Image
                 source={feedbackTypeInfo.image}
                 style={styles.image}
                />
                
                <Text
                    style={styles.titleText}
                >
                    {feedbackTypeInfo.title}
                </Text>

            </View>

        </View>

        <TextInput 
            multiline
            onChangeText={setComment}
            style={styles.input}
            placeholder="Descreva o problema"
            autoCorrect={false}
            placeholderTextColor={theme.colors.text_secondary}
        />

        <View
            style={styles.footer}
        >
            <ScreeshotButton 
                onTakeShot={handleScreeshot}
                onRemoveShot={handleScreeshotRemove}
                screenshot={screenshot}
            />

            <Button 
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>

    </View>
  );
}