import { View, Text, Image, Pressable, Alert } from "react-native";
import tw from 'twrnc';
import { useEffect, useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import userStore from '../../stores/user'
import api from './api'
// import localStorage from '../../utils/localStorage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MaleIcon, FemaleIcon } from '../../components/Icons'
import Loading from "../../components/Loading";

const NavigateButton = ({ text, to, navigation }) => {
    return (
        <Pressable style={tw`w-1/3 items-center h-24 justify-center`} onPress={() => { navigation.navigate(to) }}>
            <Text style={tw`text-2xl`}>{text}</Text>
        </Pressable>
    )
}

const EventButton = ({ text, onPress }) => {
    return (
        <Pressable style={tw`w-1/3 items-center h-24 justify-center`} onPress={onPress}>
            <Text style={tw`text-2xl`}>{text}</Text>
        </Pressable>
    )
}

const Profile = () => {
    const navigation = useNavigation();
    const { username, avatar, brief, id, role, category, gender, currentLocation } = userStore();
    const setMerchant = userStore(state => state.beMerchant);
    const setAvatar = userStore(state => state.setAvatar);
    const [loading, setLoading] = useState(false);
    const beMerchant = async () => {
        setLoading(true);
        const [latitude, longitude] = currentLocation;
        const res = await api.beMerchant(latitude, longitude);
        if (res.success == true) {
            const tmpCategory = res.data.category;
            setMerchant(latitude, longitude, tmpCategory);
            // const userStr = localStorage.getString("user");
            // const user = JSON.parse(userStr);
            // user.role = 1;
            // user.location = [latitude, longitude];
            // user.category = category;
            // localStorage.set("user", JSON.stringify(user));
            setLoading(false);
            Alert.alert(
                '操作提示',
                '请前往店铺管理界面修改店铺信息',
                [
                    {
                        text: '跳转至店铺管理', onPress: () => {
                            navigation.navigate("MerchantManage");
                        }
                    },
                ],
                { cancelable: false }
            );
        }
    }
    const handleBeMerchant = () => {
        Alert.alert(
            '操作确认',
            // '成为商家须支付50金币,您确定吗?',
            '您确定要成为商家吗?',
            [
                { text: '取消', onPress: () => { } },
                { text: '确认', onPress: beMerchant },
            ],
            { cancelable: false }
        );
    }
    const changeAvatar = async (uri) => {
        const file = {
            uri: uri,
            type: `multipart/form-data`,
            name: `image.png`,
        }
        const res = await api.changeAvatar(file);
        const avatar = res.avatar;
        setAvatar(avatar);
        // console.log(avatar);
        // const userStr = localStorage.getString("user");
        // const user = JSON.parse(userStr);
        // user.avatar = avatar;
        // localStorage.set("user", JSON.stringify(user));
    }
    const handleChangeAvatar = async () => {
        const options = {}
        const result = await launchImageLibrary(options);
        Alert.alert(
            '修改头像确认',
            '确定修改为此头像吗?',
            [
                { text: '取消', onPress: () => { } },
                { text: '确认', onPress: () => changeAvatar(result.assets[0].uri) },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={tw`flex-1 gap-2`}>
            <Loading visible={loading} />
            <View style={tw`flex-row bg-yellow-500 p-2 gap-2 items-center`}>
                <Pressable style={tw`h-24 w-24`} onPress={handleChangeAvatar}>
                    <Image style={tw`h-full w-full rounded-full border-white border-4`} source={{ uri: avatar }}></Image>
                </Pressable>
                <View>
                    <Text style={tw`text-white font-bold text-2xl`}>{username}</Text>
                    <Text style={tw`text-white text-xl `}>{role == 0 && "普通用户"}{role == 1 && `商家-${category}`}{role == 2 && "管理员"}</Text>
                    <View style={tw`flex-row gap-1`}>
                        <Text style={tw`text-white font-bold text-xl`}>ID:{id}</Text>
                        {gender == true ? <FemaleIcon /> : <MaleIcon />}
                    </View>

                    <Text style={tw`text-white font-bold text-xl`}>简介:{brief}</Text>
                    {/* <Text style={tw`text-white font-bold text-2xl`}>金币:{data.coin}</Text> */}
                </View>
                <Pressable style={tw`ml-auto`} onPress={() => { navigation.navigate('Profile', { userId: id }) }}>
                    <View >
                        <Text style={tw`text-white text-2xl`}>详情{">"}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={tw`bg-white p-2`}>
                <Text style={tw`text-2xl border-b-4 border-b-[#f7f7f7] items-center font-bold`}>服务</Text>
                <View style={tw`flex-row items-center`}>
                    {role == 0 && <EventButton text="成为商家" onPress={handleBeMerchant}></EventButton>}
                    {role == 1 && <>
                        <NavigateButton text="店铺管理" to="MerchantManage" navigation={navigation}></NavigateButton>
                        <NavigateButton text="发布推广" to="Publish" navigation={navigation}></NavigateButton>
                    </>}
                </View>
                <View style={tw`flex-row items-center`}>
                    <NavigateButton text="我的关注" to="Follow" navigation={navigation}></NavigateButton>
                    <NavigateButton text="账号管理" to="AccountManage" navigation={navigation}></NavigateButton>
                </View>
            </View>
            <View></View>
        </View>
    )
}
export default Profile;