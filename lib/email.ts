import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { OrderStatusUpdateEmail } from '@/emails/OrderStatusUpdate';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = 'Soyol Video Shop <noreply@resend.dev>'; // Should be replaced with verified domain in prod

export async function sendOrderConfirmation(order: any, email: string) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('[Email] Skipping send: RESEND_API_KEY not found');
            return;
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: `Захиалга баталгаажлаа #${order.id.slice(-6).toUpperCase()}`,
            react: OrderConfirmationEmail({ order }) as React.ReactElement,
        });

        if (error) {
            console.error('[Email] Failed to send confirmation:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('[Email] Unexpected error:', err);
        return { success: false, error: err };
    }
}

export async function sendOrderStatusUpdate(order: any, email: string, status: any) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('[Email] Skipping send: RESEND_API_KEY not found');
            return;
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: `Таны захиалгын төлөв шинэчлэгдлээ: #${order.id.slice(-6).toUpperCase()}`,
            react: OrderStatusUpdateEmail({
                order,
                newStatus: status,
                deliveryEstimate: order.deliveryEstimate
            }) as React.ReactElement,
        });

        if (error) {
            console.error('[Email] Failed to send status update:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('[Email] Unexpected error:', err);
        return { success: false, error: err };
    }
}
