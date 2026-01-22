import { ThreeCanvas } from '@remotion/three';
import { useVideoConfig, useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import React from 'react';
import { DaMao, ErMao, SanMao, Flag, DeliveryBox } from './Characters';

// 场景控制器
const SceneContent = () => {
    const frame = useCurrentFrame();
    
    // 阴影降临效果 (调整环境光)
    const darkness = interpolate(frame, [750, 800, 1200, 1250], [1, 0.2, 0.2, 1], { extrapolateRight: 'clamp' });
    
    // 外卖盒位置
    const boxY = interpolate(frame, [1200, 1230], [10, -1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    
    return (
        <>
            <ambientLight intensity={0.5 * darkness} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1 * darkness} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5 * darkness} />
            <Environment preset="city" />

            {/* 地面 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#f7f1e3" />
            </mesh>
            <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={20} blur={2} far={4} />

            {/* 角色站位 */}
            <group position={[0, -0.5, 0]}>
                {/* 旗子 */}
                <Flag position={[-3, -1.5, -2]} rotation={[0, 0.2, 0]} />

                {/* 大毛 */}
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <DaMao position={[0, 0, 0]} />
                </Float>

                {/* 二毛 */}
                <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.3}>
                    <ErMao position={[2.5, 0, 0.5]} rotation={[0, -0.5, 0]} />
                </Float>

                {/* 三毛 */}
                <Float speed={8} rotationIntensity={0.5} floatIntensity={1}>
                    <SanMao position={[-2.5, 0.5, 0.5]} rotation={[0, 0.5, 0]} />
                </Float>

                 {/* 外卖盒 */}
                 {frame > 1150 && (
                     <DeliveryBox position={[0, boxY, 2]} rotation={[0, frame * 0.05, 0]} />
                 )}
            </group>
        </>
    );
};

// 字幕组件
const Subtitles = () => {
    const frame = useCurrentFrame();
    
    const getCurrentSubtitle = () => {
        if (frame < 150) return "哈喽大家吼，我是狮驼岭的大毛";
        if (frame < 300) return "这是我二弟，特长是鼻子长";
        if (frame < 450) return "缺点是经常把自己绊倒 (啵~)";
        if (frame < 600) return "这是三弟，号称扶摇直上九万里";
        if (frame < 750) return "目前主要还是靠走";
        if (frame < 900) return "卧槽！大妖气！难道是猴子？！";
        if (frame < 1050) return "大哥我腿软！我也软！";
        if (frame < 1200) return "额... 原来是隔壁牛魔王寄来的特产";
        if (frame < 1500) return "祝您用餐愉快~";
        return "今天的狮驼岭也是和平的一天呢";
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: 200,
            width: '100%',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: 50,
            color: 'white',
            textShadow: '4px 4px 0 #000',
            fontWeight: 'bold',
        }}>
            {getCurrentSubtitle()}
        </div>
    );
};

export const ClayScene: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#f7f1e3' }}>
        <ThreeCanvas width={width} height={height} style={{ position: 'absolute' }}>
             <SceneContent />
        </ThreeCanvas>
        <Subtitles />
    </AbsoluteFill>
  );
};
