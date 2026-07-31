from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    func,
    Index,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

from app.core.enums import (
    FieldDataType,
    DatabaseDataType,
    RecordStatus,
)
# ------------------------------------------------------------------
# Enums
# ------------------------------------------------------------------



# ------------------------------------------------------------------
# Model
# ------------------------------------------------------------------


class PlatformModuleField(Base):
    __tablename__ = "platform_module_fields"
    
    __table_args__ = (
        Index("idx_module", "module_id"),
        Index("idx_field_name", "field_name"),
        Index("idx_display_order", "display_order"),
    )

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )

    module_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("platform_modules.id", ondelete="CASCADE"),
        nullable=False,
    )

    field_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    display_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    data_type: Mapped[FieldDataType] = mapped_column(
        SqlEnum(FieldDataType),
        nullable=False,
    )

    database_type: Mapped[DatabaseDataType] = mapped_column(
        SqlEnum(DatabaseDataType),
        nullable=False,
    )

    field_length: Mapped[int | None] = mapped_column(Integer)

    precision_value: Mapped[int | None] = mapped_column(Integer)

    scale_value: Mapped[int | None] = mapped_column(Integer)

    default_value: Mapped[str | None] = mapped_column(Text)

    placeholder: Mapped[str | None] = mapped_column(
        String(255)
    )

    help_text: Mapped[str | None] = mapped_column(Text)

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=1,
    )

    field_group: Mapped[str | None] = mapped_column(
        String(100)
    )

    is_required: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    is_unique: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    is_indexed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    is_searchable: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    is_filterable: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    is_sortable: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    show_in_form: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    show_in_grid: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    show_in_details: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    is_editable: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    is_readonly: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    is_hidden: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    lookup_module_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("platform_modules.id"),
    )

    lookup_display_field: Mapped[str | None] = mapped_column(
        String(100)
    )

    validation_regex: Mapped[str | None] = mapped_column(
        String(500)
    )

    min_value: Mapped[Decimal | None] = mapped_column(
        Numeric(18, 4)
    )

    max_value: Mapped[Decimal | None] = mapped_column(
        Numeric(18, 4)
    )

    formula_expression: Mapped[str | None] = mapped_column(
        Text
    )

    status: Mapped[RecordStatus] = mapped_column(
        SqlEnum(RecordStatus),
        default=RecordStatus.ACTIVE,
    )

    created_by: Mapped[int | None] = mapped_column(BigInteger)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=func.current_timestamp(),
    )

    updated_by: Mapped[int | None] = mapped_column(BigInteger)

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=func.current_timestamp(),
        server_onupdate=func.current_timestamp(),
    )

    # ----------------------------------------------------------
    # Relationships
    # ----------------------------------------------------------

    module = relationship(
        "PlatformModule",
        foreign_keys=[module_id],
        back_populates="fields",
    )

    lookup_module = relationship(
        "PlatformModule",
        foreign_keys=[lookup_module_id],
    )

    # ----------------------------------------------------------
    # Helpers
    # ----------------------------------------------------------

    def __repr__(self) -> str:
        return (
            f"<PlatformModuleField("
            f"id={self.id}, "
            f"field='{self.field_name}', "
            f"module={self.module_id})>"
        )
