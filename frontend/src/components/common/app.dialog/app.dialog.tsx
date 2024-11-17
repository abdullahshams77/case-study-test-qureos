import "./app.dialog.css";
import { Dialog, DialogProps } from "primereact/dialog";

interface AppDialogProps extends DialogProps {
    style?: React.CSSProperties;
    footer?: React.ReactNode;
    closable?: boolean;
}

const AppDialog: React.FC<AppDialogProps> = (props) => {
    const { header, visible, children, modal, className, style, footer, closable = true } = props; 

    return (
        <Dialog
            header={header}
            visible={visible}
            modal={true}
            onHide={props.onHide}
            style={style}
            contentStyle={{ minHeight: '70vh', minWidth: '500px', overflowY: 'auto', maxHeight: '80vh' }}
            className={className}
            footer={footer}
            closable={closable}
        >
            {children}
        </Dialog>
    );
};

export default AppDialog;
