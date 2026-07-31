from enum import Enum


class ModuleType(str, Enum):
    MASTER = "MASTER"
    TRANSACTION = "TRANSACTION"
    REPORT = "REPORT"
    SYSTEM = "SYSTEM"
    DASHBOARD = "DASHBOARD"


class RecordStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


class FieldDataType(str, Enum):
    TEXT = "TEXT"
    TEXTAREA = "TEXTAREA"
    NUMBER = "NUMBER"
    DECIMAL = "DECIMAL"
    DATE = "DATE"
    DATETIME = "DATETIME"
    TIME = "TIME"
    BOOLEAN = "BOOLEAN"
    EMAIL = "EMAIL"
    PHONE = "PHONE"
    URL = "URL"
    PASSWORD = "PASSWORD"
    LOOKUP = "LOOKUP"
    MULTI_LOOKUP = "MULTI_LOOKUP"
    RADIO = "RADIO"
    CHECKBOX = "CHECKBOX"
    FILE = "FILE"
    IMAGE = "IMAGE"
    SIGNATURE = "SIGNATURE"
    BARCODE = "BARCODE"
    QRCODE = "QRCODE"
    GPS = "GPS"
    JSON = "JSON"
    HTML = "HTML"
    FORMULA = "FORMULA"
    AUTO_NUMBER = "AUTO_NUMBER"


class DatabaseDataType(str, Enum):
    VARCHAR = "VARCHAR"
    TEXT = "TEXT"
    INT = "INT"
    BIGINT = "BIGINT"
    DECIMAL = "DECIMAL"
    DATE = "DATE"
    DATETIME = "DATETIME"
    TIME = "TIME"
    BOOLEAN = "BOOLEAN"
    JSON = "JSON"
