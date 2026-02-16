export interface ButtonProps {
    key: string;
    label: string;
    icon?: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    disabled?: boolean;
    hidden?: boolean;
}