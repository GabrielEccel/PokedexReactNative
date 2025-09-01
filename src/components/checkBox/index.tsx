import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { checkBoxStyles as styles } from './checkboxStyles';

interface CheckBoxProps{
    label: string,
    checked: boolean,
    ontoggle: () => void
}


export default function CheckBox({label, checked, ontoggle}:CheckBoxProps) {
 return (
   <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Pressable onPress={ontoggle}>
            <Feather name={checked ? 'check-square': 'square'} size={18} color={checked? '#4630EB': '#000'}/>
        </Pressable>
   </View>
  );
}