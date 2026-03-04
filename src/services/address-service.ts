import { apiFetch } from "@/utils/fetch"

export interface State {
	id: string
	code: string
	name: string
}

export interface City {
	id: string
	name: string
}

export interface CreateAddressPayload {
	street: string
	number: string
	complement?: string
	neighborhood: string
	zipCode: string
	cityId: string
	latitude?: string
	longitude?: string
	reference?: string
}

export interface Address {
	id: string
	street: string
	number: string
	complement: string | null
	neighborhood: string
	zipCode: string
	cityId: string
	latitude: string | null
	longitude: string | null
	reference: string | null
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export async function getStates(): Promise<State[]> {
	return await apiFetch<State[]>("/address/states")
}

export async function getCities(stateCode: string): Promise<City[]> {
	return await apiFetch<City[]>(`/address/cities/${stateCode}`)
}

export async function createAddress(
	data: CreateAddressPayload
): Promise<{ id: string }> {
	return await apiFetch<{ id: string }>("/address", {
		method: "POST",
		body: JSON.stringify(data),
	})
}

export async function getAddressById(addressId: string): Promise<Address> {
	return await apiFetch<Address>(`/address/${addressId}`)
}
