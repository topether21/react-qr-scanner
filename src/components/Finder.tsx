import React from 'react';

import OnOff from './OnOff';
import Torch from './Torch';
import Zoom from './Zoom';

interface IFinderProps {
    scanning: boolean;
    loading: boolean;
    capabilities: MediaTrackCapabilities;
    border?: number;
    onOff?: boolean;
    startScanning: (deviceId?: string | undefined) => void;
    stopScanning: () => void;
    torch?: {
        status: boolean;
        toggle: (value: boolean) => void;
    };
    zoom?: {
        value: number;
        onChange: (value: number) => void;
    };
    styles?: CSSProperties;
}

export default function Finder(props: IFinderProps) {
    const { scanning, loading, capabilities, border = 35, onOff, torch, zoom, startScanning, stopScanning, styles } = props;

    const color = 'rgba(255, 0, 0, 0.5)';
    const stokeWidth = 3;

    return (
        <div style={{ position: 'relative' }}>
            <svg
                viewBox="0 0 100 100"
                style={{
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    boxSizing: 'border-box',
                    border: `${border >= 35 ? border : 35}px solid rgba(0, 0, 0, 0.2)`,
                    ...styles,
                }}
            >
                {loading && (
                    <text x="50" y="50" textAnchor="middle" fill="black" fontSize="8" fontFamily="Arial" fontWeight="bold">
                        Loading ...
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                    </text>
                )}
                <path fill="none" d="M23,0 L0,0 L0,23" stroke={color} strokeWidth={stokeWidth} />
                <path fill="none" d="M0,77 L0,100 L23,100" stroke={color} strokeWidth={stokeWidth} />
                <path fill="none" d="M77,100 L100,100 L100,77" stroke={color} strokeWidth={stokeWidth} />
                <path fill="none" d="M100,23 L100,0 77,0" stroke={color} strokeWidth={stokeWidth} />
            </svg>
            {onOff && <OnOff scanning={scanning} startScanning={startScanning} stopScanning={stopScanning} />}
            {torch && capabilities.torch && <Torch scanning={scanning} status={torch.status} torchToggle={torch.toggle} />}
            {zoom && capabilities.zoom && <Zoom scanning={scanning} capabilities={capabilities.zoom} value={zoom.value} onZoom={zoom.onChange} />}
        </div>
    );
}
