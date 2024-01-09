import { View, Image, Text, Pressable, TextInput } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
const TopSearch = ({ keyword, onChangeText }) => {
    const navigation = useNavigation();
    return (
        <View style={tw`h-15  flex-row items-center p-1`}>
            <View style={tw`bg-yellow-500 rounded-lg h-full justify-center`}>
                <Text style={tw`text-white text-lg font-bold`}>店铺推荐</Text>
            </View>
            <TextInput value={keyword} onChangeText={onChangeText} style={tw`rounded-l-3xl border-l border-t border-b text-xl bg-white flex-1`} placeholder="输入关键字"></TextInput>
            <Pressable onPress={() => { if (keyword != "") navigation.navigate('SearchResult', { keyword: keyword }) }} style={tw`rounded-r-3xl border-r border-t border-b bg-white h-full justify-center pr-1`}>
                <Text style={tw`text-black text-xl`}>搜索</Text>
            </Pressable>
        </View>
    )
}
export default TopSearch;