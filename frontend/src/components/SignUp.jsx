import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { AuthContext } from "@/context/AuthProvider"
import * as z from "zod"

import { Field, FieldGroup, FieldError, FieldLabel } from "./ui/field"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loader2, ShieldCheck, Lock, Sparkles, UserCircle2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { publicClient } from "@/api/api"


const formSchema = z.object({
    firstName: z.string().trim().min(1, { message: "First Name is required" }),
    lastName: z.string().trim().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: 'Please enter a Valid Email' }),
    password: z.string().min(8, { message: 'Password must be atleast 8 characters long' }),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Confirm password must match Password",
        path: ["confirmPassword"],
    })

function ValueProp({ icon: Icon, title, desc }) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-amber-400">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-200">{title}</p>
                <p className="text-sm text-slate-500">{desc}</p>
            </div>
        </div>
    )
}

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const { updateToken } = useContext(AuthContext);
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const withMinDelay = (promise, ms = 2500) => {
        return Promise.all([
            promise,
            new Promise((resolve) => setTimeout(resolve, ms))
        ]).then(([result]) => result);
    }

    const onsubmit = async (data) => {
        setIsLoading(true);

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }

        toast.promise(
            withMinDelay(publicClient.post('api/auth/register', payload), 2500),
            {
                loading: 'Creating your account...',
                success: (response) => {
                    const { accessToken } = response.data;

                    updateToken(accessToken)

                    form.reset();
                    navigate('/sidebar');
                    return `${payload.firstName} ${payload.lastName} account created successfully!`;
                },
                error: (error) => error.response?.data?.message || "Failed creating account",
                finally: () => setIsLoading(false),
            }
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950">

            {/* Left: brand + value props + live feed */}
            <div className="lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="flex items-center gap-2 text-teal-400 mb-6">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-mono tracking-widest uppercase">SecureAuth</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-50 leading-tight mb-3">
                    Create your account.
                </h1>
                <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-md">
                    Start with a simple and secure auth experience that keeps your workspace protected from the very first sign-in.
                </p>

                <div className="space-y-5 mb-10">
                    <ValueProp icon={ShieldCheck} title="Protected by design" desc="Secure sign-in flows and private account handling from day one." />
                    <ValueProp icon={Lock} title="Fast and reliable" desc="A clean setup that helps users get started without friction." />
                    <ValueProp icon={Sparkles} title="Ready to grow" desc="A polished foundation for any authentication-based app." />
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <UserCircle2 className="h-4 w-4 text-teal-400" />
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Account ready</span>
                    </div>
                    <p className="text-sm text-slate-300">
                        Your profile, access, and session are all managed through one clear experience.
                    </p>
                </div>
            </div>

            {/* Right: registration form */}
            <div className="lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6">
                <Card className="w-full max-w-lg bg-slate-900/60 border-slate-800 backdrop-blur space-y-6">
                    <CardHeader className="flex items-center justify-center flex-col mt-4">
                        <CardTitle className="text-2xl font-semibold text-slate-50">Create your account</CardTitle>
                        <CardDescription className="text-slate-400">Set up your access in just a few steps</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 sm:px-6">

                        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FieldGroup className="flex-1">
                                    <Controller name="firstName" control={form.control} render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='firstName' className="pb-1 text-slate-300"> First Name</FieldLabel>
                                            <Input {...field} id='firstName' aria-invalid={fieldState.invalid} placeholder='Enter Your First Name' className="w-full h-10 px-4 rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-400 transition-all outline-none" />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )} />
                                </FieldGroup>

                                <FieldGroup className="flex-1">
                                    <Controller name="lastName" control={form.control} render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='lastName' className="pb-1 text-slate-300"> Last Name</FieldLabel>
                                            <Input {...field} id='lastName' aria-invalid={fieldState.invalid} placeholder='Enter Your last Name' className="w-full h-10 px-4 rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-400 transition-all outline-none" />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                        </Field>
                                    )} />
                                </FieldGroup>
                            </div>

                            <FieldGroup>
                                <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email" className="text-slate-300"> Email </FieldLabel>
                                        <Input {...field} id="email" aria-invalid={fieldState.invalid} placeholder="Email" autoComplete="off" className="w-full h-10 px-4 rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-400 transition-all outline-none" />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )} />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password" className="text-slate-300"> Password </FieldLabel>
                                        <Input {...field} type='password' id='password' aria-invalid={fieldState.invalid} placeholder='password' autoComplete="off" className="w-full h-10 px-4 rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-400 transition-all outline-none" />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )} />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller name="confirmPassword" control={form.control} render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="confirmPassword" className="text-slate-300"> Confirm Password </FieldLabel>
                                        <Input {...field} type='password' id='confirmPassword' aria-invalid={fieldState.invalid} placeholder='Confirm Password' autoComplete="off" className="w-full h-10 px-4 rounded-lg bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-400 transition-all outline-none" />
                                        {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                    </Field>
                                )} />
                            </FieldGroup>

                            <Button type='submit' disabled={isLoading} className="w-full h-10 cursor-pointer rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-colors text-[16px]">
                                {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)} {isLoading ? "Creating Account..." : "Register"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col w-full border-t border-slate-800/60 pt-4 bg-transparent">
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link to="/" className="text-teal-400 cursor-pointer hover:underline"> Sign in </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}