import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Container } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Input, Row, Section, Space } from '@bsdaoquang/rncomponent';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';

const PasswordReset = ({ navigation }: any) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Container
            fixed
            title="Đổi mật khẩu"
            back={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={colors.white} />
                </TouchableOpacity>
            }
            style={{ backgroundColor: colors.black }}>
            <Space height={40} />
            <Section>
                <View>
                    <Input
                        labelStyleProps={{
                            color: colors.white,
                            fontFamily: fontFamilies.firaMedium,
                        }}
                        required
                        password
                        helpText='Hãy nhập mật khẩu cũ'
                        label='Mật khẩu cũ'
                        onChange={() => { }}
                        value=""
                        placeholder="Vui lòng nhập mật khẩu cũ (*)"
                    />
                    <Input
                        labelStyleProps={{
                            color: colors.white,
                            fontFamily: fontFamilies.firaMedium
                        }}
                        required
                        password
                        helpText='Hãy nhập mật khẩu mới'
                        label='Mật khẩu mới'
                        onChange={() => { }}
                        value=""
                        placeholder="Vui lòng nhập mật khẩu mới (*)"
                    />
                    <Input
                        labelStyleProps={{
                            color: colors.white,
                            fontFamily: fontFamilies.firaMedium
                        }}
                        label='Xác nhận mật khẩu'
                        required
                        password
                        helpText='Xác nhận mật khẩu'
                        onChange={() => { }}
                        value=""
                        placeholder="Vui lòng nhập lại mật khẩu mới (*)"
                    />
                    <Space height={40} />
                    <Button
                        // loading={}
                        textStyleProps={{ fontFamily: fontFamilies.firaSemiBold }}
                        color={colors.red}
                        title="Đổi mật khẩu"
                        onPress={() => { }}
                    />
                </View>
            </Section>
        </Container>
    );
};

export default PasswordReset;
