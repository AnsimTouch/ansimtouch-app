import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "@/components/Nav/nav";
import SelectModal from "@/components/Modal/profile";
import styled from "styled-components/native";

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("관리 대상자");
  const [phone, setPhone] = useState<string>("");
  const [attendanceTime, setAttendanceTime] = useState<string>("09:00");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalData, setModalData] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const apiUrl = "fds"; // 임시

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`, {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
        });
        const { profileImage, name, role, phone, attendanceTime } =
          response.data;
        setProfileImage(profileImage);
        setName(name);
        setRole(role);
        setPhone(phone);
        setAttendanceTime(attendanceTime);
      } catch (error) {
        console.error(error);
        setErrorMessage("프로필 정보를 불러오지 못했습니다.");
      }
    };

    fetchUserProfile();
  }, []);

  const openModal = (type: string, data: string = "") => {
    setModalType(type);
    setModalData(data);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType("");
    setModalData("");
  };

  const handleSave = async (newData: string) => {
    try {
      let updateField = {};
      switch (modalType) {
        case "비밀번호 수정":
          updateField = { password: newData };
          break;
        case "전화번호 수정":
          updateField = { phone: newData };
          setPhone(newData);
          break;
        case "출석체크 시간 수정":
          updateField = { attendanceTime: newData };
          setAttendanceTime(newData);
          break;
        default:
          return;
      }

      await axios.put(`${apiUrl}/update-profile`, updateField, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
      });
      closeModal();
    } catch (error) {
      console.error(error);
      setErrorMessage("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setProfileImage("");
      setName("");
      setRole("관리 대상자");
      setPhone("");
      setAttendanceTime("09:00");

      window.location.href = "/login";
      alert("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 요청 중 오류:", error);
      setErrorMessage("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContainer>
      <Nav title="프로필" router="Profile" />

      <MainWrapper>
        <ProfileImage source={{ uri: profileImage }} />
        <Name>{name}</Name>
        <Role>{role}</Role>

        <Section>
          <SectionTitle>정보 및 기능 수정</SectionTitle>
          <Box onPress={() => openModal("비밀번호 수정")}>
            <BoxText>비밀번호 수정</BoxText>
          </Box>
          <Box onPress={() => openModal("전화번호 수정", phone)}>
            <BoxText>전화번호 수정</BoxText>
          </Box>
          <Box onPress={() => openModal("출석체크 시간 수정", attendanceTime)}>
            <BoxText>출석체크 시간 수정</BoxText>
          </Box>
        </Section>

        <Section>
          <SectionTitle>계정</SectionTitle>
          <LogoutBox onPress={handleLogout}>
            <LogoutBoxText>로그아웃</LogoutBoxText>
          </LogoutBox>
        </Section>
      </MainWrapper>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <SelectModal
        isModalVisible={isModalVisible}
        onClose={closeModal}
        title={modalType}
        detail={modalData}
        onSave={handleSave}
      />
    </AuthContainer>
  );
}

const AuthContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fbfdff;
`;

const MainWrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #141414;
  margin-bottom: 6px;
`;

const Role = styled.Text`
  font-size: 12px;
  color: #4c4c4c;
  margin-bottom: 20px;
`;

const Section = styled.View`
  margin-top: 20px;
  width: 100%;
`;

const SectionTitle = styled.Text`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 11px;
`;

const Box = styled.TouchableOpacity`
  padding-left: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
  margin-bottom: 7px;
  border-radius: 5px;

  background-color: #ffffff;
  color: #141414;
  border: 1px solid #ededed;

  align-items: start;
`;

const BoxText = styled.Text`
  font-size: 1rem;
  color: #141414;
`;

const LogoutBox = styled.TouchableOpacity`
  padding-left: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
  margin-bottom: 7px;
  border-radius: 5px;

  background-color: #ffffff;
  color: #141414;
  border: 1px solid #ededed;

  align-items: start;
`;

const LogoutBoxText = styled.Text`
  font-size: 1rem;
  color: #ff4d4d;
`;

const ErrorMessage = styled.Text`
  color: #ff4d4d;
  margin-top: 10px;
`;
