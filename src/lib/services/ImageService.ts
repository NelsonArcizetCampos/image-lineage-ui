import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export default {
  async getImages(): Promise<{ id: string; url: string }[]> {
    const { data, error } = await supabase
      .from('images')
      .select('id, path')

    if (error) throw new Error(error.message)
    if (!data) return []

    const signedImages = await Promise.all(
      data.map(async (item) => {
        const { data: signed, error: signedError } = await supabase
          .storage
          .from('images')
          .createSignedUrl(item.path, 60 * 60 * 24 * 365)

        if (signedError || !signed) throw new Error(signedError?.message ?? 'Erro ao gerar URL assinado')

        return { id: item.id, url: signed.signedUrl }
      })
    )

    return signedImages
  },

  async addImages(files: FileList): Promise<{ id: string; url: string }[]> {
    const result: { id: string; url: string }[] = []

    for (const file of Array.from(files)) {
      const filePath = `public/${Date.now()}_${file.name}`

      const { error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw new Error(uploadError.message)

      const { data: inserted, error: dbError } = await supabase
        .from('images')
        .insert({ path: filePath })
        .select('id, path')
        .single()

      if (dbError || !inserted) throw new Error(dbError?.message ?? 'Erro ao guardar imagem')

      const { data: signed, error: signedError } = await supabase
        .storage
        .from('images')
        .createSignedUrl(inserted.path, 60 * 60 * 24 * 365)

      if (signedError || !signed) throw new Error(signedError?.message ?? 'Erro ao gerar URL assinado')

      result.push({ id: inserted.id, url: signed.signedUrl })
    }

    return result
  },

  async removeImage(id: string): Promise<void> {
    const { data, error: selectError } = await supabase
      .from('images')
      .select('path')
      .eq('id', id)
      .single()

    if (selectError || !data) throw new Error(selectError?.message ?? 'Imagem não encontrada')

    const { error: storageError } = await supabase
      .storage
      .from('images')
      .remove([data.path])

    if (storageError) throw new Error(storageError.message)

    const { error: dbError } = await supabase
      .from('images')
      .delete()
      .eq('id', id)

    if (dbError) throw new Error(dbError.message)
  }
} 

