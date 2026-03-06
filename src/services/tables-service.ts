import {
	getTables as domainGetTables,
	mapTableApiToTable as domainMapTableApiToTable,
} from "@/domains/tables/api/tables-api"
import type {
	TableApi as DomainTableApi,
	TableStatusApi as DomainTableStatusApi,
} from "@/domains/tables/types/table.types"

export type TableStatusApi = DomainTableStatusApi
export type TableApi = DomainTableApi

export const mapTableApiToTable = domainMapTableApiToTable
export const getTables = domainGetTables
