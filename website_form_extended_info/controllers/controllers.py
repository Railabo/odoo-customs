from odoo import http, SUPERUSER_ID, _
from odoo.addons.base.models.ir_qweb_fields import nl2br
from odoo.addons.website_form.controllers.main import WebsiteForm
import logging

_logger = logging.getLogger(__name__)


class WebsiteFormExtended(WebsiteForm):

    def insert_record(self, request, model, values, custom, meta=None):
        model_name = model.sudo().model
        if model_name == 'mail.mail':
            values.update({'reply_to': values.get('email_from')})
        record = request.env[model_name].with_user(SUPERUSER_ID).with_context(
            mail_create_nosubscribe=True).create(values)
        website = request.website

        if custom or meta:
            _custom_label = "%s\n___________\n\n" % _("Other Information:")  # Title for custom fields
            if model_name == 'mail.mail':
                _custom_label = "%s\n" % _("This message has been posted on your website.")
                _custom_label += "Website name: %s [ url: %s ]\n___________\n\n" % (_(website.name), _(website.domain))
            default_field = model.website_form_default_field_id
            default_field_data = values.get(default_field.name, '')
            custom_content = (default_field_data + "\n\n" if default_field_data else '') \
                             + (_custom_label + custom + "\n\n" if custom else '') \
                             + (self._meta_label + meta if meta else '')

            # If there is a default field configured for this model, use it.
            # If there isn't, put the custom data in a message instead
            if default_field.name:
                if default_field.ttype == 'html' or model_name == 'mail.mail':
                    custom_content = nl2br(custom_content)
                record.update({default_field.name: custom_content})
            else:
                values = {
                    'body': nl2br(custom_content),
                    'model': model_name,
                    'message_type': 'comment',
                    'res_id': record.id,
                }
                mail_id = request.env['mail.message'].with_user(SUPERUSER_ID).create(values)

        return record.id
