export type AuditModel = {
    id: string
    operation_type: string
    source_record_id: string
    target_record_id: number | null
    status: string
    error_message: string
    source_table_name: string
    operation_details: {[key: string]: any}
    performed_by: string
    created_at: Date
    updated_at: Date
}