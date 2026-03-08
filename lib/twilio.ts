import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

let client: any = null;

if (accountSid && authToken) {
    try {
        client = twilio(accountSid, authToken);
    } catch (error) {
        console.error('Failed to initialize Twilio client:', error);
    }
}

/**
 * Sends an OTP to the specified phone number.
 * Uses Twilio Verify if credentials are set, otherwise returns a mock success.
 */
export async function sendOtp(phone: string): Promise<{ success: boolean; code?: string; error?: string }> {
    // Real SMS Mode
    if (client && verifyServiceSid) {
        try {
            await client.verify.v2.services(verifyServiceSid)
                .verifications
                .create({ to: `+976${phone}`, channel: 'sms' });

            return { success: true };
        } catch (error: any) {
            console.error('Twilio Send Error:', error);
            return { success: false, error: error.message };
        }
    }

    // Mock Mode (Development)
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[Twilio Mock] Sending OTP ${mockCode} to ${phone}`);

    return {
        success: true,
        code: mockCode // Return code for dev mode visualization
    };
}

/**
 * Verifies an OTP for the specified phone number.
 * Uses Twilio Verify if credentials are set, otherwise checks against passed mock logic (handled in API).
 * Note: For mock mode, the API route handles the verification against DB.
 * This function is primarily for the Twilio path.
 */
export async function verifyOtp(phone: string, code: string): Promise<{ success: boolean; isValid?: boolean; error?: string }> {
    // Real SMS Mode
    if (client && verifyServiceSid) {
        try {
            const verification = await client.verify.v2.services(verifyServiceSid)
                .verificationChecks
                .create({ to: `+976${phone}`, code });

            if (verification.status === 'approved') {
                return { success: true, isValid: true };
            } else {
                return { success: true, isValid: false, error: 'Invalid code' };
            }
        } catch (error: any) {
            console.error('Twilio Verify Error:', error);
            return { success: false, error: error.message };
        }
    }

    // Mock Mode - Logic handled by caller (API route) since we don't store mock state here
    return { success: false, error: 'Mock mode: validation handled by API' };
}
