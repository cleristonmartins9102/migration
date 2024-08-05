type Input = {
  dateRange?: {
    startDate: string
    finishDate: string
  }
  status?: string
}
export const deliveryResolver = {
  Query: {
    load: async (_: any, httpRequest: Input, context: any): Promise<any> => {
      
    }
  }
}
