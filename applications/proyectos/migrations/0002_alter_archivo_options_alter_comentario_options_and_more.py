# Generated by Django 5.1.6 on 2025-02-28 22:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("proyectos", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="archivo",
            options={"verbose_name": "Archivo", "verbose_name_plural": "Archivos"},
        ),
        migrations.AlterModelOptions(
            name="comentario",
            options={
                "ordering": ["fecha_creacion"],
                "verbose_name": "Comentario",
                "verbose_name_plural": "Comentarios",
            },
        ),
        migrations.AlterModelOptions(
            name="etiqueta",
            options={"verbose_name": "Etiqueta", "verbose_name_plural": "Etiquetas"},
        ),
        migrations.AlterModelOptions(
            name="nota",
            options={
                "ordering": ["fecha_creacion"],
                "verbose_name": "Nota",
                "verbose_name_plural": "Notas",
            },
        ),
        migrations.AlterModelOptions(
            name="pizarra",
            options={
                "ordering": ["fecha_creacion"],
                "verbose_name": "Pizarra",
                "verbose_name_plural": "Pizarras",
            },
        ),
        migrations.AlterModelOptions(
            name="proyecto",
            options={
                "ordering": ["fecha_creacion"],
                "verbose_name": "Proyecto",
                "verbose_name_plural": "Proyectos",
            },
        ),
        migrations.RenameField(
            model_name="archivo",
            old_name="id_usuario",
            new_name="usuario",
        ),
        migrations.RenameField(
            model_name="comentario",
            old_name="id_usuario",
            new_name="usuario",
        ),
        migrations.RenameField(
            model_name="nota",
            old_name="id_usuario",
            new_name="usuario",
        ),
        migrations.RenameField(
            model_name="pizarra",
            old_name="id_usuario",
            new_name="usuario",
        ),
        migrations.RenameField(
            model_name="proyecto",
            old_name="id_usuario",
            new_name="usuario",
        ),
        migrations.RemoveField(
            model_name="archivo",
            name="id_nota",
        ),
        migrations.RemoveField(
            model_name="comentario",
            name="id_nota",
        ),
        migrations.RemoveField(
            model_name="nota",
            name="id_etiqueta",
        ),
        migrations.RemoveField(
            model_name="nota",
            name="id_pizarra",
        ),
        migrations.RemoveField(
            model_name="pizarra",
            name="id_proyecto",
        ),
        migrations.AddField(
            model_name="archivo",
            name="nota",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="archivos",
                to="proyectos.nota",
            ),
        ),
        migrations.AddField(
            model_name="comentario",
            name="nota",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="comentarios",
                to="proyectos.nota",
            ),
        ),
        migrations.AddField(
            model_name="nota",
            name="etiqueta",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="notas",
                to="proyectos.etiqueta",
            ),
        ),
        migrations.AddField(
            model_name="nota",
            name="pizarra",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="notas",
                to="proyectos.pizarra",
            ),
        ),
        migrations.AddField(
            model_name="pizarra",
            name="proyecto",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="pizarras",
                to="proyectos.proyecto",
            ),
        ),
        migrations.AlterField(
            model_name="archivo",
            name="archivo",
            field=models.FileField(blank=True, null=True, upload_to="archivos/"),
        ),
        migrations.AlterModelTable(
            name="archivo",
            table="archivos",
        ),
        migrations.AlterModelTable(
            name="comentario",
            table="comentarios",
        ),
        migrations.AlterModelTable(
            name="etiqueta",
            table="etiquetas",
        ),
        migrations.AlterModelTable(
            name="nota",
            table="notas",
        ),
        migrations.AlterModelTable(
            name="pizarra",
            table="pizarras",
        ),
        migrations.AlterModelTable(
            name="proyecto",
            table="proyectos",
        ),
    ]
