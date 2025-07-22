import { z } from 'zod';

import { createApiResponseSchema } from '../../common';

const OtherChannelSchema = z.object({
  badge_url: z.string().optional(),
  is_active: z.boolean().optional(),
  is_enable: z.boolean().optional(),
  name: z.string().optional(),
  url: z.string().optional(),

  // widget V5 new data
  index: z.number().optional(),
});

const ChannelWidgetSchema = z.object({
  live_channel: z.object({
    badge_url: z.url(),
    is_enable: z.boolean(),
    name: z.string(),
  }),
  other_channel: z.array(OtherChannelSchema),
  subtitle: z.string(),
  title: z.string(),

  // widget V5 new data
  introduction: z.string().optional(),
});

const ExtraFieldSchema = z.array(
  z.object({
    name: z.string(),
    options: z.array(
      z.object({
        id: z.number(),
        label: z.string(),
      })
    ),
    placeholder: z.string(),
    required: z.boolean(),
    type: z.string(),
  })
);

const WelcomeDialogSchema = z.object({
  welcomeMessageStatus: z.boolean(),
  welcomeText: z.string(),
  welcomeTimeout: z.string(),
  openAtStart: z.boolean(),
  attentionGrabberStatus: z.boolean(),
  grabberImage: z.boolean(),
  grabberTextStatus: z.boolean(),
  attentionGrabberText: z.string(),
  grabberTimeout: z.coerce.number(),
  attentionGrabberImage: z.url(),

  // widget V5 new data
  welcomeBrandIcon: z.string().optional(),
  welcomeGreetingText: z.string().optional(),
  welcomeActionDescription: z.string().optional(),
  welcomeActionIcon: z.string().optional(),
});

const CalltoActionSchema = z.object({
  buttonHasText: z.boolean(),
  loginFormButtonLabel: z.string(),
  buttonHasIcon: z.boolean(),
  buttonIcon: z.url(),

  // widget V5 new data
  borderRadius: z.string().optional(),
});

const ChannelSchema = z.object({
  isChannelWidgetEnabled: z.boolean(),
  channel_widget: ChannelWidgetSchema,
});

const LoginFormSchema = z.object({
  formGreet: z.string(),
  formSubtitle: z.string(),
  buttonText: z.string(),
  extra_fields: ExtraFieldSchema,
  customerIdentifierInputType: z.string(),

  // widget V5 new data
  formSecondGreet: z.string().optional(),
  loginBrandLogo: z.string().optional(),
});

const ChatFormSchema = z.object({
  customerServiceName: z.string(),
  customerServiceAvatar: z.url(),
});

const QiscusWidgetConfigDataSchema = z.object({
  appID: z.string(),
  selectedWidgetPage: z.string(),

  // organize schemas
  ...WelcomeDialogSchema.shape,
  ...CalltoActionSchema.shape,
  ...ChannelSchema.shape,
  ...LoginFormSchema.shape,
  ...ChatFormSchema.shape,

  // widget V5 new data
  colorWidget: z.string().optional(),
});

const QiscusWidgetConfigSchema = z.object({
  widget: z.object({
    styles: z.object().nullable().optional(),
    variables: QiscusWidgetConfigDataSchema.optional(),
  }),
});

export const QiscusWidgetConfigResponseSchema = createApiResponseSchema(QiscusWidgetConfigSchema);

export type OtherChannel = z.infer<typeof OtherChannelSchema>;
export type NormalizedOtherChannel = Omit<OtherChannel, 'index'> & { index: number };

export type QiscusWidgetConfigData = z.infer<typeof QiscusWidgetConfigDataSchema>;
export type QiscusWidgetConfigResponse = z.infer<typeof QiscusWidgetConfigResponseSchema>;
