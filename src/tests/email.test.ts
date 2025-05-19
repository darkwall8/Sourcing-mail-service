import request from 'supertest';
import app from '../server';
const nodemailer = require("nodemailer");

// Mock Nodemailer
jest.mock('nodemailer');

describe('Email integration test', () => {
  let sendMailMock: jest.Mock;

  beforeAll(() => {
    sendMailMock = jest.fn().mockResolvedValue(true);
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
  });

  it('should send an email successfully', async () => {
    const res = await request(app)
      .post('/email/send')
      .send({
        receiver: 'user@example.com',
        object: 'Test Email',
        messages: 'Hello world!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Email send seccuessfully !');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'wilfried.foko@2027.ucac-icam.com',
        subject: 'Test Email',
        text: 'Hello world!',
      })
    );
  });

  it('should fail when transporter fails', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('SMTP error'));

    const res = await request(app)
      .post('/email/send')
      .send({
        receiver: 'user@example.com',
        object: 'Fail Test',
        messages: 'This should fail',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Failed to send email');
  });
});
