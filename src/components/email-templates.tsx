import * as React from "react";
import moment from "moment";

interface EmailTemplateProps {
    name: string;
    email: string;
    otp: Number;
}

export interface MadeUserAdminPaymentSuccessEmailProps {
    email: string;
    name: string;
    amount: number;
    packageType: string;
    paymentId: string;
    isNewUser: boolean;
}

const EmailTemplateForSignUpOTP = ({ email, name, otp }: EmailTemplateProps) => {
    const containerStyle = {
        margin: "0 auto",
        maxWidth: "600px",
        padding: "0 20px",
        paddingBottom: "10px",
        borderRadius: "5px",
        lineHeight: "1.8",
        fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        color: "#333",
        backgroundColor: "#fff"
    };

    const headerStyle = {
        borderBottom: "1px solid #eee"
    };

    const headerLinkStyle = {
        fontSize: "1.4em",
        color: "#000",
        textDecoration: "none",
        fontWeight: "600"
    };

    const otpStyle = {
        background: "linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%)",
        margin: "0 auto",
        width: "max-content",
        padding: "0 10px",
        color: "#fff",
        borderRadius: "4px"
    };

    const footerStyle = {
        color: "#aaa",
        fontSize: "0.8em",
        lineHeight: "1",
        fontWeight: "300",
        marginTop: "0.5rem"
    };

    const emailInfoStyle = {
        color: "#666666",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "18px",
        paddingBottom: "6px"
    };

    const emailLinkStyle = {
        textDecoration: "none",
        color: "#00bc69"
    };

    const smallStyle = {
        fontSize: "0.9em",
        color: "#666666",
        fontWeight: "400",
        lineHeight: "1.6"
    };
    return <>
        <div style={containerStyle}>
            <div className="header" style={headerStyle}>
                <a style={headerLinkStyle}>Prove Your Campus Sync Identity</a>
            </div>
            <br />
            <strong>Dear {name},</strong>
            <p>
                We have received a login request for your Campus Sync account. For
                security purposes, please verify your identity by providing the
                following otp:
                <br />
                <b>Your One Time Code is :</b>
            </p>
            <h2 className="otp" style={otpStyle}>{otp.toString()}</h2>
            <br />
            <span style={smallStyle}>
                This otp will expire in 2 minutes. Please enter this otp in the
                verification page to complete the login process.
            </span>
            &nbsp;or click the link below and enter the otp in the verification page.
            <br />
            <a href={process.env.NEXT_PUBLIC_APP_URL + "/signup/verify?email=" + email} style={emailLinkStyle}>
                Verify Your Identity
            </a>
            <p style={{ fontSize: "0.9em" }}>
                <br />
                <br />
                If you did not initiate this login request, please disregard this
                message. Please ensure the confidentiality of your otp and do not share
                it with anyone.<br />
                <strong>Do not forward or give this otp to anyone.</strong>
                <br />
                <br />
                <strong>Thank you for using Campus Sync.</strong>
                <br />
                <br />
                Best regards,
                <br />
                <strong>Campus Sync</strong>
            </p>

            <hr style={{ border: "none", borderTop: "0.5px solid #131111" }} />
            <div className="footer" style={footerStyle}>
                <p>This email cannot receive replies.</p>
                <p>
                    For more information about Campus Sync and your account, visit &nbsp;
                    <a href={process.env.NEXT_PUBLIC_APP_URL}>Campus Sync</a>
                </p>
            </div>

            <div style={{ textAlign: "center" }}>
                <div className="email-info" style={emailInfoStyle}>
                    <span>
                        This email was sent to &nbsp;
                        <a href={`mailto:${email}`} style={emailLinkStyle}>{email}</a>
                    </span>
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    <a href="/" style={emailLinkStyle}>Campus Sync</a> | Hyderabad
                    | Telangana - 500001, India
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    &copy; {moment(new Date()).format("YYYY")} Campus Sync. All rights reserved.
                </div>
            </div>
        </div>
    </>;
};


const EmailTemplateForForgotPasswordOTP = ({ email, name, otp }: EmailTemplateProps) => {
    const containerStyle = {
        margin: "0 auto",
        maxWidth: "600px",
        padding: "0 20px",
        paddingBottom: "10px",
        borderRadius: "5px",
        lineHeight: "1.8",
        fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        color: "#333",
        backgroundColor: "#fff"
    };

    const headerStyle = {
        borderBottom: "1px solid #eee"
    };

    const headerLinkStyle = {
        fontSize: "1.4em",
        color: "#000",
        textDecoration: "none",
        fontWeight: "600"
    };

    const otpStyle = {
        background: "linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%)",
        margin: "0 auto",
        width: "max-content",
        padding: "0 10px",
        color: "#fff",
        borderRadius: "4px"
    };

    const footerStyle = {
        color: "#aaa",
        fontSize: "0.8em",
        lineHeight: "1",
        fontWeight: "300",
        marginTop: "0.5rem"
    };

    const emailInfoStyle = {
        color: "#666666",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "18px",
        paddingBottom: "6px"
    };

    const emailLinkStyle = {
        textDecoration: "none",
        color: "#00bc69"
    };

    const smallStyle = {
        fontSize: "0.9em",
        color: "#666666",
        fontWeight: "400",
        lineHeight: "1.6"
    };
    return <>
        <div style={containerStyle}>
            <div className="header" style={headerStyle}>
                <a style={headerLinkStyle}>Prove Your Campus Sync Identity</a>
            </div>
            <br />
            <strong>Dear {name},</strong>
            <p>
                We have received a request to reset your password for your Campus Sync
                account. For security purposes, please verify your identity by providing
                the following otp:
                <br />
                <b>Your One Time Code is :</b>
            </p>
            <h2 className="otp" style={otpStyle}>{otp.toString()}</h2>
            <br />
            <span style={smallStyle}>
                This otp will expire in 2 minutes. Please enter this otp in the
                verification page to reset your password.
            </span>
            &nbsp;or click the link below and enter the otp in the verification page.
            <br />
            <a href={process.env.NEXT_PUBLIC_APP_URL + "/forgot-password/verify?email=" + email} style={emailLinkStyle}>
                Verify Your Identity
            </a>
            <p style={{ fontSize: "0.9em" }}>
                <br />
                <br />
                If you did not initiate this password reset request, please disregard this
                message. Please ensure the confidentiality of your otp and do not share
                it with anyone.<br />
                <strong>Do not forward or give this otp to anyone.</strong>
                <br />
                <br />
                <strong>Thank you for using Campus Sync.</strong>
                <br />
                <br />
                Best regards,
                <br />
                <strong>Campus Sync</strong>
            </p>
            <hr style={{ border: "none", borderTop: "0.5px solid #131111" }} />
            <div className="footer" style={footerStyle}>
                <p>This email cannot receive replies.</p>
                <p>
                    For more information about Campus Sync and your account, visit &nbsp;
                    <a href={process.env.NEXT_PUBLIC_APP_URL}>Campus Sync</a>
                </p>
            </div>
            <div style={{ textAlign: "center" }}>
                <div className="email-info" style={emailInfoStyle}>
                    <span>
                        This email was sent to &nbsp;
                        <a href={`mailto:${email}`} style={emailLinkStyle}>{email}</a>
                    </span>
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    <a href="/" style={emailLinkStyle}>Campus Sync</a> | Hyderabad
                    | Telangana - 500001, India
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    &copy; {moment(new Date()).format("YYYY")} Campus Sync. All rights reserved.
                </div>
            </div>
        </div>
    </>;
};

const MadeUserAdminPaymentSuccessEmail = ({ email, name, amount, packageType, paymentId, isNewUser }: MadeUserAdminPaymentSuccessEmailProps) => {
    const containerStyle = {
        margin: "0 auto",
        padding: "0 20px",
        paddingBottom: "10px",
        borderRadius: "5px",
        lineHeight: "1.8",
        fontFamily: "Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        color: "#333",
        backgroundColor: "#fff"
    };

    const headerStyle = {
        borderBottom: "1px solid #eee"
    };

    const headerLinkStyle = {
        fontSize: "1.4em",
        color: "#000",
        textDecoration: "none",
        fontWeight: "600"
    };

    const footerStyle = {
        color: "#aaa",
        fontSize: "0.8em",
        lineHeight: "1",
        fontWeight: "300",
        marginTop: "0.5rem"
    };

    const emailInfoStyle = {
        color: "#666666",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "18px",
        paddingBottom: "6px"
    };

    const emailLinkStyle = {
        textDecoration: "none",
        color: "#00bc69"
    };

    const smallStyle = {
        fontSize: "0.9em",
        color: "#666666",
        fontWeight: "400",
        lineHeight: "1.6"
    };

    const newUserPasswordStyle = {
        color: "#00bc69",
        fontWeight: "600",
        textDecoration: "none"
    };

    let paidAmount = amount.toString().slice(0, amount.toString().length - 2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return <>
        <div style={containerStyle}>
            <div className="header" style={headerStyle}>
                <a style={headerLinkStyle}>Your Payment is Successful</a>
            </div>
            <br />
            <strong>Dear {name},</strong>
            <p>
                We have received your payment for the <b>{packageType}</b> package. Your payment of ₹<b>{paidAmount}</b> has been successfully received. Your payment id is <i>{paymentId}</i>. Please login to your account to access the benefits of the <b>{packageType}</b> package.
            </p>
            {isNewUser && <>
                <p>
                    <strong>Your account has been created successfully.</strong>
                    <br />
                    <p>Your temporary password is &nbsp;<span style={newUserPasswordStyle}>{name?.split(" ").join("").toLowerCase()}</span></p>
                    <br />
                    <span>
                        You can now login to your account and change your password in the
                        account settings page.
                    </span>
                    <br />
                </p>
            </>}
            <br />
            <span style={smallStyle}>
                You can now enjoy the benefits of the {packageType} package. If you have
                any questions or concerns, please feel free to contact us at &nbsp;
                <a href="mailto:help@campus-sync.vercel.app" style={emailLinkStyle}>mail</a>.
            </span>
            <br />
            <p style={{ fontSize: "0.9em" }}>
                <br />
                <br />
                <strong>Thank you for using Campus Sync.</strong>
                <br />
                <br />
                Best regards,
                <br />
                <strong>Campus Sync</strong>
            </p>
            <hr style={{ border: "none", borderTop: "0.5px solid #131111" }} />
            <div className="footer" style={footerStyle}>
                <p>This email cannot receive replies.</p>
                <p>
                    For more information about Campus Sync and your account, visit &nbsp;
                    <a href={process.env.NEXT_PUBLIC_APP_URL}>Campus Sync</a>
                </p>
            </div>
            <div style={{ textAlign: "center" }}>
                <div className="email-info" style={emailInfoStyle}>
                    <span>
                        This email was sent to &nbsp;
                        <a href={`mailto:${email}`} style={emailLinkStyle}>{email}</a>
                    </span>
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    <a href="/" style={emailLinkStyle}>Campus Sync</a> | Hyderabad
                    | Telangana - 500001, India
                </div>
                <div className="email-info" style={emailInfoStyle}>
                    &copy; {moment(new Date()).format("YYYY")} Campus Sync. All rights reserved.
                </div>
            </div>
        </div>
    </>;
};

export { EmailTemplateForSignUpOTP, EmailTemplateForForgotPasswordOTP, MadeUserAdminPaymentSuccessEmail };