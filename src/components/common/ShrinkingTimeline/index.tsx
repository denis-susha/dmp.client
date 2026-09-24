import React, { useEffect, useState } from "react";
import { Styled } from "./shrinkingTimeline.styles";
import { useTranslation } from "next-i18next/pages";

const formatTime = (totalSeconds: number): string => {
    const secondsValue = Math.round(totalSeconds);

    const hours = Math.floor(secondsValue / 3600);
    const minutes = Math.floor((secondsValue % 3600) / 60);
    const seconds = secondsValue % 60;

    // Pad with zeros if necessary
    const pad = (num: number) => num.toString().padStart(2, "0");
    return hours ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
};

interface ShrinkingTimelineProps {
    startTime: number; // Unix timestamp (milliseconds)
    expirationMinutes: number;
    onFinish: () => void;
    intervalMs?: number; // The interval for shrinking the timeline in milliseconds
}

const ShrinkingTimeline: React.FC<ShrinkingTimelineProps> = ({
    startTime,
    expirationMinutes,
    onFinish,
    intervalMs = 1000,
}) => {
    const { t } = useTranslation(["payment"]);
    const expirationTime = startTime + expirationMinutes * 60 * 1000;
    const [remainingTime, setRemainingTime] = useState(expirationTime - Date.now());

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeLeft = expirationTime - Date.now();
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);

            if (timeLeft <= 0) {
                clearInterval(interval);
                onFinish();
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [expirationTime, intervalMs, onFinish]);

    // Calculate the width of the shrinking bar as a percentage
    const progressPercentage = 100 - (remainingTime / (expirationMinutes * 60 * 1000)) * 100;
    const soonEnd = progressPercentage > 70;

    return (
        <Styled.Container>
            {isClient && (
                <>
                    <Styled.Progress $progressPercentage={progressPercentage} $soonEnd={soonEnd} />
                    <Styled.Background $soonEnd={soonEnd} />
                    <Styled.Content>
                        <Styled.Title>
                            {t(soonEnd ? "timelineTitle.soonEnd" : "timelineTitle.awaitingPayment")}
                        </Styled.Title>
                        <Styled.Spacer />
                        <Styled.Title>{formatTime(remainingTime / 1000)}</Styled.Title>
                    </Styled.Content>
                </>
            )}
        </Styled.Container>
    );
};

export default ShrinkingTimeline;
