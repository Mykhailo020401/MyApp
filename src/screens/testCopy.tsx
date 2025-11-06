// import { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

// export default function TestCopy() {
//   //ПОЛЯ
//   const [formName, setFormName] = useState('');
//   const [formSurname, setFormSurname] = useState('');
//   const [formAge, setFormAge] = useState('');
//   const [hasJobForm, sethasJobForm] = useState(false);

//   const schema = z.object({
//     name: z.string().min(2, { message: 'Поле має містити мінімум 2 символи.' }),
//     surname: z
//       .string()
//       .min(2, { message: 'Поле має містити мінімум 2 символи.' }),
//     age: z.number().min(2, { message: 'Поле має містити мінімум 2 символи.' }),

//     hasJob: z.boolean(),
//   });

//   const FormComponent = () => {
//     const {
//       control,
//       handleSubmit,
//       formState: { errors },
//     } = useForm({
//       resolver: zodResolver(schema),
//     });
//   };

//   const onSubmit = data => {
//     console.log(name);
//   };

//   return (
//     <View>
//       <Controller
//         control={control}
//         name="name"
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={setFormName}
//             value={formName}
//             placeholder="Введіть ваше ім`я"
//           />
//         )}
//       />

//       {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   error: {
//     color: 'red',
//   },
//   input: {
//     marginTop: 10,
//     backgroundColor: 'silver',
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   upButton: {
//     marginTop: 20,
//   },
//   head: {
//     color: 'red',
//     padding: 20,
//     marginTop: 50,
//   },

//   human: {
//     color: 'white',
//     padding: 5,
//   },
// });
// // import React from 'react';
// // import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// // import { useForm, Controller } from 'react-hook-form';
// // import { any, string, z } from 'zod';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { useState } from 'react';

// // // Define Zod schema for form validation
// // const schema = z.object({
// //   name: z
// //     .string()
// //     .min(2, { message: 'Name must be at least 2 characters long' }),
// //   email: z.string().email({ message: 'Invalid email address' }),
// //   age: z.number().min(18, { message: 'You must be at least 18 years old' }),
// // });

// // const TestCopy = () => {
// //   // Initialize the form with React Hook Form and Zod schema resolver

// //  const [formName, setFormName] = useState('');
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: zodResolver(schema),
// //   });

// //   // Function to handle form submission
// //   const onSubmit = (data:any) => {
// //     console.log(data);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text>Name</Text>
// //       <Controller
// //         control={control}
// //         name="name"
// //         render={({ field: { onChange, onBlur, value } }) => (
// //           <TextInput
// //             style={styles.input}
// //             onBlur={onBlur}
// //             onChangeText={onChange}
// //             value={value}
// //             placeholder="Enter your name"
// //           />
// //         )}
// //       />
// //       {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

// //       <Text>Email</Text>
// //       <Controller
// //         control={control}
// //         name="email"
// //         render={({ field: { onChange, onBlur, value } }) => (
// //           <TextInput
// //             style={styles.input}
// //             onBlur={onBlur}
// //             onChangeText={onChange}
// //             value={value}
// //             placeholder="Enter your email"
// //           />
// //         )}
// //       />
// //       {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

// //       {/* <Text>Age</Text>
// //       <Controller
// //         control={control}
// //         name="age"
// //         render={({ field: { onChange, onBlur, value } }) => (
// //           <TextInput
// //             style={styles.input}
// //             onBlur={onBlur}
// //             onChangeText={val => onChange(val ? parseInt(val, 10) : '')}
// //             value={value}
// //             placeholder="Enter your age"
// //             keyboardType="numeric"
// //           />
// //         )}
// //       />
// //       {errors.age && <Text style={styles.error}>{errors.age.message}</Text>} */}

// //       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     marginBottom: 10,
// //     paddingHorizontal: 8,
// //   },
// //   error: {
// //     color: 'red',
// //   },
// // });

// // export default TestCopy;
