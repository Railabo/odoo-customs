{
    "name": "Video setting for VOIP - email",
    "summary": """
        Video settings for voip - email.
        """,
    "author": "Krys.R from Railabo.com",
    "website": "https://youtu.be/9BBLMqFRBJQ",
    "category": "Discuss",
    "license": "LGPL-3",
    "version": "15.0.1.0.1",
    "images": ["mail_video_devices/static/src/description/images/cover.png"],
    # any module necessary for this one to work correctly
    "depends": ["mail"],
    'assets': {
        'mail.assets_discuss_public': [
            'mail_video_devices/static/src/components/*/*.js',
            'mail_video_devices/static/src/models/*/*.js',
        ],
        'web.assets_backend': [
            'mail_video_devices/static/src/components/*/*.js',
            'mail_video_devices/static/src/models/*/*.js',
        ],
        'web.assets_qweb': [
            'mail_video_devices/static/src/components/*/*.xml',
        ],
    },
    "installable": True,
    "auto_install": False,
    "application": False,
    "price": 0.00,
    "currency": 'EUR',
}
