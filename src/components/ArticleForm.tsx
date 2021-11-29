import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import MDEditor from '@uiw/react-md-editor';
import { IArticle } from '@/models/article';

interface FormProps {
    article?: IArticle;
    img?: string;
    submitFn: (data: any) => void;
}

const ArticleForm = React.forwardRef<HTMLInputElement, FormProps>(
    ({ article, img, submitFn }, ref) => {
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [image, setImage] = useState<string>('');
        const [file, setFile] = useState<Blob | string>('');
        const fileUploadRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (article?.title) setTitle(article.title);
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

        function deleteFiles() {
            if (fileUploadRef.current?.value) {
                fileUploadRef.current.value = '';
            }
            setImage('');
        }

        const handlePerex = (content: string, wordsCount = 45): string => {
            return content.split(' ').slice(0, wordsCount).join(' ') + '...';
        };

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            const id = article?.articleId || uuidv4();
            const fd = new FormData();
            if (file) fd.append('image', file);

            submitFn({
                articleId: id,
                title,
                content,
                imageId: article?.imageId || id,
                perex: handlePerex(content),
                image: fd,
            });
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
                    />
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
                        <Button
                            variant='secondary'
                            className='d-block'
                            onClick={() => fileUploadRef.current?.click()}
                        >
                            Upload an image
                        </Button>
                    )}
                </Form.Group>
                <Form.Group className='mb-5'>
                    <Form.Label>Content</Form.Label>
                    <MDEditor
                        preview='edit'
                        height={400}
                        value={content}
                        onChange={(v) => setContent(v || '')}
                    />
                </Form.Group>

                <input type='submit' hidden ref={ref} />
            </Form>
        );
    }
);

export default ArticleForm;
