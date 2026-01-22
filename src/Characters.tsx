import React, { useRef } from 'react';
import { Sphere, Box, Cone } from '@react-three/drei';
import * as THREE from 'three';
import { interpolate, useCurrentFrame } from 'remotion';

// 通用粘土材质
export const ClayMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial
    color={color}
    roughness={0.9}
    metalness={0.1}
  />
);

// 模拟定格动画的晃动
const useStopMotion = (fps: number) => {
    const frame = useCurrentFrame();
    // 降低帧率到 12fps
    return Math.floor(frame / (30 / 12)) * (30 / 12);
};

// 大毛 (青狮) - 蓝色方块头
export const DaMao = (props: any) => {
  const smFrame = useStopMotion(30);
  
  // 呼吸感动画
  const scale = interpolate(Math.sin(smFrame * 0.1), [-1, 1], [0.95, 1.05]);

  return (
    <group {...props} scale={[scale, scale, scale]}>
      {/* 头 */}
      <Box args={[1.2, 1.2, 1.2]} position={[0, 0, 0]}>
        <ClayMaterial color="#3498db" />
      </Box>
      {/* 眼睛 */}
      <Sphere args={[0.15]} position={[0.3, 0.2, 0.6]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      <Sphere args={[0.15]} position={[-0.3, 0.2, 0.6]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      {/* 大嘴巴 */}
      <Box args={[0.8, 0.2, 0.1]} position={[0, -0.3, 0.6]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>
    </group>
  );
};

// 二毛 (白象) - 白色圆球 + 长鼻子
export const ErMao = (props: any) => {
  const smFrame = useStopMotion(30);
  // 鼻子甩动
  const noseRotation = interpolate(Math.sin(smFrame * 0.2), [-1, 1], [-0.5, 0.5]);

  return (
    <group {...props}>
      {/* 头 */}
      <Sphere args={[1, 32, 32]}>
        <ClayMaterial color="#ecf0f1" />
      </Sphere>
      {/* 眼睛 */}
      <Sphere args={[0.1]} position={[0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      <Sphere args={[0.1]} position={[-0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      {/* 长鼻子 */}
      <group position={[0, 0, 0.9]} rotation={[0, 0, noseRotation]}>
          <Box args={[0.2, 1.5, 0.2]} position={[0, -0.8, 0]}>
             <ClayMaterial color="#bdc3c7" />
          </Box>
      </group>
      {/* 耳朵 */}
      <Box args={[0.8, 0.8, 0.1]} position={[1, 0, 0]} rotation={[0, -0.5, 0]}>
         <ClayMaterial color="#ecf0f1" />
      </Box>
      <Box args={[0.8, 0.8, 0.1]} position={[-1, 0, 0]} rotation={[0, 0.5, 0]}>
         <ClayMaterial color="#ecf0f1" />
      </Box>
    </group>
  );
};

// 三毛 (大鹏) - 黑色小鸡
export const SanMao = (props: any) => {
  const smFrame = useStopMotion(30);
  // 翅膀扇动
  const wingRot = interpolate(Math.sin(smFrame * 0.5), [-1, 1], [-0.5, 0.5]);

  return (
    <group {...props}>
      {/* 身体 */}
      <Sphere args={[0.8, 32, 32]} scale={[1, 1.2, 1]}>
        <ClayMaterial color="#2c3e50" />
      </Sphere>
      {/* 尖嘴 */}
      <Cone args={[0.2, 0.5]} position={[0, 0.2, 0.7]} rotation={[1.5, 0, 0]}>
        <ClayMaterial color="#f1c40f" />
      </Cone>
      {/* 翅膀 */}
      <Box args={[0.8, 0.1, 0.4]} position={[0.8, 0, 0]} rotation={[0, 0, wingRot]}>
         <ClayMaterial color="#34495e" />
      </Box>
      <Box args={[0.8, 0.1, 0.4]} position={[-0.8, 0, 0]} rotation={[0, 0, -wingRot]}>
         <ClayMaterial color="#34495e" />
      </Box>
    </group>
  );
};

// 狮驼岭小旗子
export const Flag = (props: any) => {
    return (
        <group {...props}>
            <Box args={[0.05, 3, 0.05]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#8e44ad" />
            </Box>
            <Box args={[1.5, 1, 0.05]} position={[0.75, 2.5, 0]}>
                <ClayMaterial color="#e74c3c" />
            </Box>
        </group>
    )
}

// 外卖盒
export const DeliveryBox = (props: any) => {
    return (
        <Box args={[2, 1.5, 2]} {...props}>
            <ClayMaterial color="#f39c12" />
        </Box>
    )
}
