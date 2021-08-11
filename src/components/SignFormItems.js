// import React from 'react';
// import { Text, View, TextInput, Button, Alert, Dimensions, StyleSheet } from 'react-native';
// import { useForm, Controller } from "react-hook-form";

// var WIDTH = Dimensions.get('window').width;
// var HEIGHT = Dimensions.get('window').height;

// const SignFormItems = () => {
//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);

//     return (
//         <View style={styles.inputContainer}>
//             <Text style={styles.inputTitle}>Student Email</Text>
//             <Controller
//             control={control}
//             render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={value => onChange(value)}
//                 value={value}
//             />
//             )}
//             name="studentEmail"
//             rules={{ required: true }}
//             defaultValue=""
//             />
//             {errors.studentEmail && <Text>This is required.</Text>}
//             <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     inputContainer: {
//         // display: 'flex',
//         // flexDirection: 'column',
//         // alignItems: 'flex-start',
//         padding: 0,
    
//         position: 'absolute',
//         width: 243,
//         height: 418,
//         left: 24,
//         top: 185,
//       },
//     inputTitle: {
//         // // position: 'static',
//         // width: 118,
//         // height: '113%',
//         // left: 0,
//         // top: 0,
//         /* Title */
//         fontFamily: 'Avenir',
//         fontStyle: 'normal',
//         fontWeight: '800',
//         fontSize: 18,
//         lineHeight: 24,
//         /* identical to box height, or 133% */
//         /* Neutral/Black */
//         color: '#000000',
//         marginBottom: 8,
//     },
//     input: {
//         width: 170,
//         height: 24,
//         left: 0,
//         top: 0,
    
//         fontFamily: 'Avenir',
//         fontStyle: 'normal',
//         fontWeight: 'normal',
//         fontSize: 18,
//         lineHeight: 24,
//         color: '#4B4B4B',
//     }
//   });

// export default SignFormItems;