import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


export default function Detail() {
    const navigation = useNavigation();    
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Hello ${incident.name}, I am getting in touch because I would like to help in the case "${incident.title}" with the value ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(incident.value)}`;

    
    

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Hero of my case: ${incident.title}`,
            recipients: [incident.email],
            body: message
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container} > 
             <View style={styles.header} >
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02048" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident} >
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASE:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox} >
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero for this case!</Text>

                <Text style={styles.heroDescription}>Contact</Text>

                <View style={styles.contactBox} >
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}