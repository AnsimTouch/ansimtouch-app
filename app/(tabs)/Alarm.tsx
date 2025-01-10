import Notification from "@/components/Alarm/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styled from "styled-components/native";
import { SERVER_URL } from "@env";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useGetMe";
import { Alert } from "react-native";

export default function Alarm() {
  const { user, fetchUser } = useGetMe();
  const [requestList, setRequestList] = useState<any[]>([]);
  const [userInfoMap, setUserInfoMap] = useState<Map<number, any>>(new Map());

  const onApprove = async (id: number) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${SERVER_URL}/user/approve`,
        {},
        {
          params: { requestId: id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res) {
        console.log("보내기 성공");
        Alert.alert("요청을 승인했습니다.");
        onRequestList();
      }
    } catch (e) {
      console.error(e);
      Alert.alert("전송에 실패했습니다.");
    }
  };

  const onRequestList = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.get(`${SERVER_URL}/user/request`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res) {
        setRequestList(res.data);
      }
    } catch (e) {
      console.error("받기 실패", e);
    }
  };

  useEffect(() => {
    onRequestList();
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      for (const item of requestList) {
        if (item.status === "PENDING" && !userInfoMap.has(item.id)) {
          try {
            const res = await axios.get(`${SERVER_URL}/user/${user?.id}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: { userId: item.id },
            });
            if (res) {
              setUserInfoMap(
                (prevMap) => new Map(prevMap.set(item.id, res.data))
              );
            }
          } catch (e) {
            console.error("받기 실패", e);
          }
        }
      }
    };

    fetchUserInfo();
  }, [requestList, userInfoMap, user?.id]);

  return (
    <Container>
      <Notification type="TAXI_CALL" />
      {requestList.map((item) => {
        const userInfo = userInfoMap.get(item.id);
        if (item.status === "PENDING") {
          return (
            <Notification
              key={item.id}
              type="RELATION_REQUEST"
              user={userInfo?.username || "알 수 없음"}
              phoneNumber={userInfo?.tel || "010-1234-5678"}
              onApprove={() => onApprove(item.id)}
            />
          );
        } else {
          return (
            <Notification
              key={item.id}
              type="RELATION_ACCEPTED"
              user="박영희"
            />
          );
        }
      })}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fbfdff;
`;
