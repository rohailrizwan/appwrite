import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Service from '../../appwrite/Configuration'
import Select from '../Select'
import Button from '../button'


function Postform({ post }) {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            statust: post?.status || '',
        }
    })
    const userdata = useSelector(state => state.user)

    const submitData = async (data) => {
        if (post) {
            const file = data?.image[0] ? Service.Uploadfile(data?.image[0]) : null
            if (file) {
                Service.Deletefile(post?.feature_img)
            }
            const db = await Service.updatePost(post.$id,
                {
                    ...data,
                    feature_img: file ? file.$id : undefined

                })

            if (db) {
                navigate(`/post/${db.$id}`)
            }
        }
        else {
            const file = await Service.Uploadfile(data?.image[0])
            if (file) {
                const fileId = file.$id
                data.feature_img = fileId
                const result = await Service.createPost({
                    ...data,
                    userid: userdata.$id
                })
                if (result) {
                    navigate(`/post/${result.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'String') {
            return value.trim.toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-')
        }
    }, [])
    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Postform
