import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import MDEditor from '@uiw/react-md-editor';
import { IArticle } from '@/models/article';

interface FormProps {
    article?: IArticle;
    img?: string;
    submitFn: (data: any) => void;
}

interface FormError {
    title: string;
    content: string;
    image: string;
    perex: string;
}

const ArticleForm = React.forwardRef<HTMLInputElement, FormProps>(
    ({ article, img, submitFn }, ref) => {
        const [title, setTitle] = useState('');
        const [perex, setPerex] = useState('');
        const [content, setContent] = useState('');
        const [image, setImage] = useState<string>('');
        const [errors, setErrors] = useState<FormError>({
            title: '',
            content: '',
            image: '',
            perex: '',
        });
        const [file, setFile] = useState<Blob | string>('');
        const fileUploadRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (article?.title) setTitle(article.title);
            if (article?.perex) setPerex(article.perex);
            if (article?.content) setContent(article.content);
            if (img) setImage(img);
        }, [article, img]);

        function onFileChange(event: ChangeEvent<HTMLInputElement>) {
            if (event.target.files?.length) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);

                setFile(event.target.files[0]);

                reader.onload = ({ target }) => {
                    if (target?.result) {
                        setImage(String(target.result));
                    }
                };
            }
        }

        const isValid = () => {
            let errors = {} as FormError;

            if (!title) {
                errors.title = 'Title is required';
            }

            if (!perex) {
                errors.perex = 'Perex is required';
            } else if (perex.length <= 50) {
                errors.perex = 'Should contain at least 50 characters';
            }

            if (!content) {
                errors.content = 'Content is required';
            } else if (content.length <= 150) {
                errors.content = 'Should contain at least 150 characters';
            }

            if (!image) {
                errors.image = 'Image is required';
            }

            setErrors(errors);

            if (Object.keys(errors).length === 0) {
                return true;
            } else {
                return false;
            }
        };

        function deleteFiles() {
            if (fileUploadRef.current?.value) {
                fileUploadRef.current.value = '';
            }
            setImage('');
        }

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();

            if (isValid()) {
                const id = article?.articleId || uuidv4();
                const fd = new FormData();
                if (file) fd.append('image', file);

                submitFn({
                    articleId: id,
                    title,
                    content,
                    imageId: article?.imageId || id,
                    perex,
                    image: fd,
                });
            }
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-5' controlId='articleTitle'>
                    <Form.Label>Article title</Form.Label>
                    <Form.Control
                        value={title}
                        type='text'
                        placeholder='My first article'
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-5' controlId='articleTitle'>
                    <Form.Label>Perex</Form.Label>
                    <Form.Control
                        value={perex}
                        type='text'
                        placeholder='My first article'
                        onChange={(e) => setPerex(e.target.value)}
                        isInvalid={!!errors.perex}
                    />
                    <Stack className='mt-2' direction='horizontal' gap={3}>
                        {errors.content && <div className='text-danger'>{errors.content}</div>}
                        <div className='ms-auto text-muted'>{perex.length} characters</div>
                    </Stack>
                </Form.Group>
                <Form.Group className='mb-5' controlId='articleImage'>
                    <Form.Label>Featured image</Form.Label>
                    <input
                        ref={fileUploadRef}
                        type='file'
                        hidden
                        id='articleImage'
                        accept='image/png, image/jpg, image/jpeg'
                        onChange={onFileChange}
                    />
                    {image ? (
                        <div style={{ maxWidth: '200px' }}>
                            {<Image src={`${image}`} className='w-100' />}
                            <ButtonGroup size='sm' className='d-flex align-items-center'>
                                <Button
                                    variant='link'
                                    className='text-primary text-decoration-none'
                                    onClick={() => fileUploadRef.current?.click()}
                                >
                                    Update new
                                </Button>
                                <span className='divider text-muted'>|</span>
                                <Button
                                    variant='link'
                                    className='text-danger text-decoration-none'
                                    onClick={deleteFiles}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </div>
                    ) : (
                        <>
                            <Button
                                variant='secondary'
                                className='d-block'
                                onClick={() => fileUploadRef.current?.click()}
                            >
                                Upload an image
                            </Button>
                            {errors.image && (
                                <div className='mt-2 text-danger'>{errors.image}</div>
                            )}
                        </>
                    )}
                </Form.Group>
                <Form.Group className='mb-5'>
                    <Form.Label>Content</Form.Label>
                    <MDEditor
                        preview='edit'
                        height={400}
                        value={content}
                        onChange={(v) => setContent(v || '')}
                        className={!!errors.content ? 'border border-danger' : ''}
                    />
                    <Stack className='mt-2' direction='horizontal' gap={3}>
                        {errors.content && <div className='text-danger'>{errors.content}</div>}
                        <div className='ms-auto text-muted'>{content.length} characters</div>
                    </Stack>
                </Form.Group>

                <input type='submit' hidden ref={ref} />
            </Form>
        );
    }
);

export default ArticleForm;
