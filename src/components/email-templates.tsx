import * as React from "react";
import moment from "moment";

interface EmailTemplateProps {
    name: string;
    email: string;
    otp: Number;
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
                    <a href="https://campus-sync.vercel.app">Campus Sync</a>
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

export { EmailTemplateForSignUpOTP };