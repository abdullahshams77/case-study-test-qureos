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
            modal={modal}
            onHide={props.onHide}
            style={style}
            contentStyle={{ overflowY: 'auto', maxHeight: '80vh' }}
            className={className}
            footer={footer}
            closable={closable}
        >
            {children}
        </Dialog>
    );
};

export default AppDialog;
