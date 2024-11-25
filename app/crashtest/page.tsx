'use client'

import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
    fieldName: string; // Exemple de champ, à remplacer
};

export default async function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="fieldName" className="block text-sm font-medium">fieldName</label>
                <input
                    id="fieldName"
                    {...register("fieldName", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.fieldName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Submit
            </button>
        </form>
    );
};