import React, {useEffect, useState} from 'react';
// import { SafeArea } from "react-native";
import {Text, View, SafeAreaView, TextInput, Button} from 'react-native';
import axios from 'axios';
import {Form, useForm, Controller} from 'react-hook-form';

const Login = ({navigation}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
            userName: "",
          password: "",
        },
      })
      const onSubmit = (data) => {
        axios.post('http://192.168.0.111:5000/admin/login', data)
        .then((res) => {
            console.log("Login response: ", res);
        })
        .catch((err) => console.log("Error while login: ", err))
      }

  return (
    <View>
      <Controller
        control={control}
        // rules={{
        //   required: true,
        // }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="User Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Button
        title="Create New Account"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Login;
