import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

interface Starprops{
    checked: boolean,
    onToogle: () => void
}

export default function Star({checked, onToogle}: Starprops) {
 return (
   <View>
    <TouchableOpacity onPress={onToogle}>
      <FontAwesome name={checked ? 'star': 'star-o'} size={24} color={checked? 'gold': '#000'}/>
    </TouchableOpacity>
   </View>
  );
}

