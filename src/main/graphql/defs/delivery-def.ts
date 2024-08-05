import { gql } from 'apollo-server-express'

export const deliveryDefs = gql`
  scalar Date

  type Product {
    id: String
    description: String
    image: String
    allergens: [String]
    brand: String
    category: String
    factor_type: String
    factor_value: Float
    halal_certificate: Boolean
    ingredients: [String]
    name: String
    shortName: String
    unit: String
    factorDisplay: String
    vatType: String
    totalPriceIncVat: Float
    singleItemExVat: Float
    created_at: String
    updated_at: String
    updated_by: String
    created_by: String
  }

  type Branch {
    id: String
    internal_id: Float
    name: String
  }

  type Wallet {
    balance: Float
  }

  type Location {
    address: String
    number: String
    complement: String
    postcode: String
    city: String
  }

  type Shop {
    name: String
    location: Location
  }

  type Contact {
    phone_number: String
    email: String
  }

  type MemberModel {
    id: String
    user_account_id: String
    first_name: String
    last_name: String
    customer_type: String
    disabled: Boolean
    email_verified: Boolean
    internal_id: String
    invoiced_by: String
    payroll_number: Float
    role: String
    branch: Branch
    wallet: Wallet
    location: Location
    shop: Shop
    settings: MemberShipSettings
    contact: Contact
    web_parent: Float
    updated_at: Date
    created_at: Date
  }

  type MemberShipSettings {
    can_deliver: Boolean
    delivery_day_1: String
    delivery_day_2: String
    delivery_day_3: String
    delivery_day_4: String
    delivery_day_5: String
    delivery_day_6: String
    delivery_day_7: String
    notifications: Notifications
    push_asked: Boolean
    transac_marketing_notifications: TransacMarketingNotifications
  }

  type Notifications {
    email: Boolean
    push: Boolean
    sms: Boolean
  }

  type TransacMarketingNotifications {
    marketing: Notifications
    transactional: Notifications
  }

  type Item {
    id: String
    product: Product
    factorDisplay: String
    vatType: String
    quantity: Float
    price_including_vat: Float
    price_excluding_vat: Float
    vat: String
    receipt_text: String
  }

  type TimeSlot {
    date: String
    day: String
    from: String
    to: String
  }

  type Order {
    id: String
    member: MemberModel
    internal_id: String
    optimize_h: Boolean
    timeslot: TimeSlot
    status: String
    order_id: String
    invoice_id: String
    price_including_vat: Float
    price_excluding_vat: Float
    vat: Float
    due: Float
    picking_branch: String
    sales_branch: String
    date_of_invoice: String
    time: Date
    sale_type: String
    items: [Item]
    created_at: Date
    updated_at: Date
  }

  type Delivery {
    id: String
    order: Order
    order_id: String
    vat_analysis: [VatAnalysis]
    motification: Modification
    short_pick: ShortPick
    status: String
    deliveryDate: String
    total: Float
    value: Float
    vat: Float
    special_price: Float
    placed_by_system: Boolean
    created_at: Date
    updated_at: Date
    updated_by: String
    created_by: String
  }

  type VatAnalysis {
    rate: Float
    type: String
    value: Float
    vat: Float
  }

  type Modification {
    product_id: String
    image: String
    name: String
  }

  type ShortPick {
    product_id: String
    ordered_quantity: Float
    picked_quantity: Float
    short_value: Float
  }

  input DataRangeInput {
    startDate: String!
    finishDate: String!
  }

  type Query {
    loadUserDeliveries(id: String, dateRange: DataRangeInput, status: String): [Delivery]
  }
`
